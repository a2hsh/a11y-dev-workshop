import React from 'react';
import { t } from '../i18n/i18n';

export function WorkshopFooter() {
  // Only show in production
  if (import.meta.env.DEV) return null;

  return (
    <footer className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-12 mt-16">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">🧠 {t('footer_title')}</h2>
          <p className="text-blue-200 text-lg">
            {t('footer_tagline')}
          </p>
        </div>
        
        <div className="mb-8">
          <p className="text-blue-100 text-base leading-relaxed max-w-2xl mx-auto">
            {t('footer_description')}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
          <a 
            href="https://github.com/a2hsh/a11y-dev-workshop"
            className="inline-flex items-center gap-2 bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            {t('footer_github')}
          </a>
          <a 
            href="https://github.com/a2hsh/a11y-dev-workshop#-quick-start"
            className="inline-flex items-center gap-2 border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('footer_get_started')}
          </a>
        </div>

        <div className="text-sm text-blue-300">
          <p className="mb-2">
            <strong>{t('footer_program')}</strong> • {t('footer_authority')}
          </p>
          <p className="italic">
            &ldquo;{t('footer_quote')}&rdquo;
          </p>
        </div>
      </div>
    </footer>
  );
}
