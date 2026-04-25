import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="bg-white rounded-2xl border border-primary-100 p-6 flex flex-col items-start gap-3 shadow-sm">
      <span className="text-3xl">{icon}</span>
      <h3 className="font-semibold text-lg text-gray-800">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

export default function Home() {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col gap-16">
      {/* Hero */}
      <section className="text-center flex flex-col items-center gap-6 pt-10">
        <span className="text-6xl">🍄</span>
        <h1 className="text-4xl sm:text-5xl font-bold text-primary-800 leading-tight">
          {t('home.hero_title')}
        </h1>
        <p className="text-lg text-gray-500 max-w-xl leading-relaxed">
          {t('home.hero_subtitle')}
        </p>
        <div className="flex gap-3 flex-wrap justify-center">
          {isAuthenticated ? (
            <Link
              to="/dashboard"
              className="bg-primary-600 hover:bg-primary-700 text-white font-medium px-6 py-3 rounded-xl text-base transition-colors"
            >
              {t('nav.dashboard')}
            </Link>
          ) : (
            <>
              <Link
                to="/register"
                className="bg-primary-600 hover:bg-primary-700 text-white font-medium px-6 py-3 rounded-xl text-base transition-colors"
              >
                {t('home.get_started')}
              </Link>
              <Link
                to="/login"
                className="bg-white border border-primary-300 hover:bg-primary-50 text-primary-700 font-medium px-6 py-3 rounded-xl text-base transition-colors"
              >
                {t('nav.login')}
              </Link>
            </>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-center text-primary-800">
          {t('home.features_title')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <FeatureCard icon="📋" title={t('home.feature_1_title')} desc={t('home.feature_1_desc')} />
          <FeatureCard icon="💡" title={t('home.feature_2_title')} desc={t('home.feature_2_desc')} />
          <FeatureCard icon="📱" title={t('home.feature_3_title')} desc={t('home.feature_3_desc')} />
        </div>
      </section>
    </div>
  );
}
