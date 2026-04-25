import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFetch } from '../../hooks/useFetch';
import { getStats } from '../../api/admin';
import AdminLayout from '../../components/layout/AdminLayout';
import Card from '../../components/ui/Card';
import Alert from '../../components/ui/Alert';

function StatCard({ label, value, icon }) {
  return (
    <div className="bg-white rounded-2xl border border-primary-100 shadow-sm p-5 flex items-center gap-4">
      <span className="text-3xl">{icon}</span>
      <div>
        <p className="text-2xl font-bold text-primary-800">{value ?? '—'}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const { t } = useTranslation();
  const { data, loading, error } = useFetch(getStats);
  const stats = data?.data;

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-primary-800">{t('admin.stats.title')}</h1>

        {error && <Alert message={t('admin.error')} />}

        {loading ? (
          <p className="text-sm text-gray-400">{t('admin.loading')}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <StatCard icon="👥" label={t('admin.stats.total_leads')} value={stats?.totalLeads} />
            <StatCard icon="✨" label={t('admin.stats.new_today')} value={stats?.newLeadsToday} />
            <StatCard icon="✉️" label={t('admin.stats.total_contacts')} value={stats?.totalContacts} />
            <StatCard icon="📅" label={t('admin.stats.total_demos')} value={stats?.totalDemos} />
            <StatCard icon="📰" label={t('admin.stats.subscribers')} value={stats?.totalSubscribers} />
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
