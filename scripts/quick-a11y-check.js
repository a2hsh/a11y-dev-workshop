#!/usr/bin/env node

import { AccessibilityAuditor } from './lighthouse-audit.js';

/**
 * Quick accessibility check for development
 * This script runs a fast accessibility audit on the current page
 */

async function quickCheck() {
  const url = process.argv[2] || 'http://localhost:5173';

  console.log('🔍 Quick Accessibility Check');
  console.log('===========================');
  console.log(`📍 URL: ${url}\n`);

  try {
    const auditor = new AccessibilityAuditor({
      baseUrl: url,
      routes: [''], // Just check the root or provided URL
      chromeFlags: ['--headless', '--no-sandbox', '--disable-dev-shm-usage']
    });

    const results = await auditor.auditAllRoutes();
    const result = results[0];

    if (result.error) {
      console.log('❌ Audit failed:', result.error);
      process.exit(1);
    }

    console.log(`\n🎯 Quick Results:`);
    console.log(`Score: ${result.scorePercent}/100`);

    if (result.failedAudits && result.failedAudits.length > 0) {
      console.log(`\n🚨 Issues found (${result.failedAudits.length}):`);
      result.failedAudits.forEach((audit, index) => {
        console.log(`${index + 1}. ${audit.title}`);
        if (audit.description) {
          console.log(`   ${audit.description.replace(/<[^>]*>/g, '')}`);
        }
        console.log('');
      });
    } else {
      console.log('\n✅ No accessibility issues found!');
    }

    console.log(`📄 Full report: ${result.htmlPath}`);

  } catch (error) {
    console.error('❌ Quick check failed:', error.message);
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  quickCheck();
}
