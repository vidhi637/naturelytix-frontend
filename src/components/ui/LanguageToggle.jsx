import React from 'react';
import { useTranslation } from 'react-i18next';

export default function LanguageToggle({ className = '' }) {
  const { t, i18n } = useTranslation();

  const toggle = () => {
    const next = i18n.language.startsWith('hi') ? 'en' : 'hi';
    i18n.changeLanguage(next);
  };

  return (
    <button
      onClick={toggle}
      className={`text-sm font-medium text-primary-700 hover:text-primary-900 px-3 py-1.5 rounded-lg hover:bg-primary-100 transition-colors ${className}`}
    >
      {t('lang.switch')}
    </button>
  );
}
