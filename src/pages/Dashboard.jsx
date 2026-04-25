import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import Card from '../components/ui/Card';

function ProfileRow({ label, value }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 py-3 border-b border-primary-50 last:border-0">
      <span className="text-sm font-medium text-gray-500 sm:w-36">{label}</span>
      <span className="text-base text-gray-800">{value || '—'}</span>
    </div>
  );
}

export default function Dashboard() {
  const { t } = useTranslation();
  const { user } = useAuth();

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString()
    : '—';

  return (
    <div className="flex flex-col gap-8">
      {/* Welcome */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-primary-200 flex items-center justify-center text-2xl font-bold text-primary-800">
          {user?.initials || '?'}
        </div>
        <div>
          <p className="text-sm text-gray-500">{t('dashboard.welcome')},</p>
          <h1 className="text-2xl font-bold text-primary-800">{user?.fullName || user?.email}</h1>
        </div>
      </div>

      {/* Profile card */}
      <Card>
        <h2 className="text-lg font-semibold text-primary-800 mb-4">{t('dashboard.profile_title')}</h2>
        <ProfileRow label={t('dashboard.full_name')} value={user?.fullName} />
        <ProfileRow label={t('dashboard.email')} value={user?.email} />
        <ProfileRow label={t('dashboard.initials')} value={user?.initials} />
        <ProfileRow label={t('dashboard.member_since')} value={memberSince} />
      </Card>

      {/* Coming soon */}
      <Card className="text-center py-10">
        <span className="text-4xl">🌱</span>
        <h3 className="text-xl font-semibold text-primary-800 mt-3">{t('dashboard.coming_soon')}</h3>
        <p className="text-gray-500 text-sm mt-2 max-w-sm mx-auto">{t('dashboard.coming_soon_desc')}</p>
      </Card>
    </div>
  );
}
