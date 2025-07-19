#!/usr/bin/env node


import fs from 'fs';
import path from 'path';
import * as chromeLauncher from 'chrome-launcher';
import { fileURLToPath } from 'url';

// Helper to load config file
function loadConfig(env = 'development') {
  const configPath = path.resolve(__dirname, '../lighthouse.config.json');
  if (!fs.existsSync(configPath)) return {};
  const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  const envConfig = (config.lighthouse && config.lighthouse[env]) || {};
  return envConfig;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class AccessibilityAuditor {
  constructor(options = {}) {
    this.baseUrl = options.baseUrl || 'http://localhost:5173';
    this.outputDir = options.outputDir || path.join(__dirname, '../lighthouse-reports');
    this.routes = options.routes || [
      '/',
      '/login',
      '/article/1'
    ];
    this.chromeFlags = options.chromeFlags || ['--headless', '--no-sandbox'];
  }

  async ensureOutputDir() {
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }


  async launchChrome() {
    console.log('🚀 Launching Chrome...');
    this.chrome = await chromeLauncher.launch({
      chromeFlags: this.chromeFlags
    });
    return this.chrome;
  }

  async closeBrowser() {
    if (this.chrome) {
      await this.chrome.kill();
      console.log('🔒 Chrome closed');
    }
  }

  getAccessibilityConfig() {
    return {
      extends: 'lighthouse:default',
      settings: {
        onlyCategories: ['accessibility'],
        output: ['html', 'json'],
        formFactor: 'desktop',
        throttling: {
          rttMs: 40,
          throughputKbps: 10240,
          cpuSlowdownMultiplier: 1,
          requestLatencyMs: 0,
          downloadThroughputKbps: 0,
          uploadThroughputKbps: 0
        },
        screenEmulation: {
          mobile: false,
          width: 1350,
          height: 940,
          deviceScaleFactor: 1,
          disabled: false,
        }
      }
    };
  }

  async auditUrl(url, routeName = 'page') {
    console.log(`📊 Auditing: ${url}`);

    // Dynamic import for lighthouse
    const lighthouse = (await import('lighthouse')).default;

    const options = {
      logLevel: 'info',
      port: this.chrome.port,
    };

    try {
      const runnerResult = await lighthouse(url, options, this.getAccessibilityConfig());

      if (!runnerResult) {
        throw new Error('Lighthouse audit failed to return results');
      }

      // Save HTML report
      const htmlReport = runnerResult.report[0];
      const htmlPath = path.join(this.outputDir, `${routeName}-accessibility.html`);
      fs.writeFileSync(htmlPath, htmlReport);

      // Save JSON report
      const jsonReport = runnerResult.report[1];
      const jsonPath = path.join(this.outputDir, `${routeName}-accessibility.json`);
      fs.writeFileSync(jsonPath, jsonReport);

      // Extract accessibility results
      const lhr = runnerResult.lhr;
      const accessibilityScore = lhr.categories.accessibility.score;
      const accessibilityAudits = lhr.categories.accessibility.auditRefs;

      console.log(`✅ ${routeName}: Accessibility score: ${Math.round(accessibilityScore * 100)}/100`);

      // Get failed audits details
      const failedAudits = accessibilityAudits
        .filter(auditRef => {
          const audit = lhr.audits[auditRef.id];
          return audit.score === 0 || audit.score === null;
        })
        .map(auditRef => {
          const audit = lhr.audits[auditRef.id];
          return {
            id: auditRef.id,
            title: audit.title,
            description: audit.description,
            score: audit.score,
            displayValue: audit.displayValue,
            details: audit.details
          };
        });

      return {
        url,
        routeName,
        score: accessibilityScore,
        scorePercent: Math.round(accessibilityScore * 100),
        failedAudits,
        htmlPath,
        jsonPath,
        totalAudits: accessibilityAudits.length,
        passedAudits: accessibilityAudits.length - failedAudits.length
      };

    } catch (error) {
      console.error(`❌ Error auditing ${url}:`, error.message);
      return {
        url,
        routeName,
        error: error.message,
        score: 0,
        scorePercent: 0,
        failedAudits: [],
        totalAudits: 0,
        passedAudits: 0
      };
    }
  }

  async auditAllRoutes() {
    await this.ensureOutputDir();
    await this.launchChrome();

    const results = [];
    for (const route of this.routes) {
      const url = `${this.baseUrl}${route}`;
      const routeName = route === '/' ? 'home' : route.replace(/\//g, '-').replace(/^-/, '');
      const result = await this.auditUrl(url, routeName);
      results.push(result);
      // Use globalThis.setTimeout for Node.js compatibility
      await new Promise(resolve => globalThis.setTimeout(resolve, 1000));
    }
    await this.closeBrowser();
    await this.generateSummaryReport(results);
    // Print concise summary for devs
    this.printDevSummary(results);
    return results;
  }
  printDevSummary(results) {
    // Only show summary if at least one result has a score
    const validResults = results.filter(r => typeof r.scorePercent === 'number');
    if (!validResults.length) return;

    const avgScore = validResults.reduce((sum, r) => sum + r.scorePercent, 0) / validResults.length;
    const minScore = Math.min(...validResults.map(r => r.scorePercent));
    const maxScore = Math.max(...validResults.map(r => r.scorePercent));

    console.log('\n================ Accessibility Audit Summary ================');
    console.log(`Total routes audited: ${validResults.length}`);
    console.log(`Average accessibility score: ${Math.round(avgScore)}/100`);
    console.log(`Best score: ${Math.round(maxScore)}/100, Worst score: ${Math.round(minScore)}/100`);
    console.log('------------------------------------------------------------');
    validResults.forEach(r => {
      const status = r.scorePercent >= 90 ? '✅' : r.scorePercent >= 70 ? '⚠️' : '❌';
      console.log(`${status} ${r.routeName.padEnd(12)}: ${r.scorePercent}/100`);
    });
    console.log('============================================================\n');
  }

  async generateSummaryReport(results) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const summaryPath = path.join(this.outputDir, `accessibility-summary-${timestamp}.json`);

    const summary = {
      timestamp: new Date().toISOString(),
      totalRoutes: results.length,
      averageScore: results.reduce((sum, r) => sum + r.scorePercent, 0) / results.length,
      results: results.map(r => ({
        route: r.routeName,
        url: r.url,
        score: r.scorePercent,
        totalAudits: r.totalAudits,
        passedAudits: r.passedAudits,
        failedAudits: r.failedAudits?.length || 0,
        hasErrors: !!r.error,
        htmlReport: r.htmlPath,
        jsonReport: r.jsonPath
      }))
    };

    fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));

    console.log('\n📈 Accessibility Audit Summary:');
    console.log('=====================================');
    console.log(`📅 Timestamp: ${summary.timestamp}`);
    console.log(`📊 Average Score: ${Math.round(summary.averageScore)}/100`);
    console.log(`🔍 Routes Audited: ${summary.totalRoutes}`);

    results.forEach(result => {
      const status = result.scorePercent >= 90 ? '✅' :
        result.scorePercent >= 70 ? '⚠️' : '❌';
      console.log(`${status} ${result.routeName}: ${result.scorePercent}/100`);

      if (result.failedAudits && result.failedAudits.length > 0) {
        console.log(`   Failed audits: ${result.failedAudits.length}`);
        result.failedAudits.slice(0, 3).forEach(audit => {
          console.log(`   - ${audit.title}`);
        });
        if (result.failedAudits.length > 3) {
          console.log(`   ... and ${result.failedAudits.length - 3} more`);
        }
      }
    });

    console.log(`\n📄 Reports saved to: ${this.outputDir}`);
    console.log(`📋 Summary saved to: ${summaryPath}`);

    return summary;
  }
}


// CLI usage
async function main() {
  const args = process.argv.slice(2);
  let env = 'development';
  const cliOptions = {};

  // Parse command line arguments
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    switch (arg) {
      case '--env':
        env = args[++i] || 'development';
        break;
      case '--url':
        cliOptions.baseUrl = args[++i];
        break;
      case '--output':
        cliOptions.outputDir = args[++i];
        break;
      case '--routes':
        cliOptions.routes = args[++i].split(',');
        break;
      case '--help':
        console.log(`
Accessibility Auditor - Lighthouse programmatic tool

Usage: node lighthouse-audit.js [options]

Options:
  --env <env>         Config environment (development, production, ci; default: development)
  --url <url>         Base URL to audit (overrides config)
  --output <path>     Output directory for reports (overrides config)
  --routes <routes>   Comma-separated routes to audit (overrides config)
  --help              Show this help message

Examples:
  node lighthouse-audit.js
  node lighthouse-audit.js --env production
  node lighthouse-audit.js --url http://localhost:5173
  node lighthouse-audit.js --routes /,/about,/contact
        `);
        process.exit(0);
        break;
    }
  }

  // Load config from file and merge with CLI args (CLI args take precedence)
  const fileConfig = loadConfig(env);
  const options = { ...fileConfig, ...cliOptions };

  try {
    const auditor = new AccessibilityAuditor(options);
    await auditor.auditAllRoutes();
    process.exit(0);
  } catch (error) {
    console.error('❌ Audit failed:', error.message);
    process.exit(1);
  }
}


// Always run main when this script is executed directly
main();

export { AccessibilityAuditor };
