import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFetch } from '../../hooks/useFetch';
import { getSubscribers } from '../../api/newsletter';
import AdminLayout from '../../components/layout/AdminLayout';
import Card from '../../components/ui/Card';
import DataTable from '../../components/ui/DataTable';
import Alert from '../../components/ui/Alert';

export default function NewsletterSubscribers() {
  const { t } = useTranslation();
  const { data, loading, error } = useFetch(getSubscribers);
  const subscribers = data?.data ?? [];

  const columns = [
    { key: 'email', label: t('admin.newsletter.email') },
    {
      key: 'createdAt',
      label: t('admin.newsletter.subscribed_on'),
      render: (r) => r.createdAt ? new Date(r.createdAt).toLocaleDateString() : '—',
    },
  ];

  return (
    <AdminLayout>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-primary-800">{t('admin.newsletter.title')}</h1>
        {error && <Alert message={t('admin.error')} />}

        <Card className="p-0 overflow-hidden">
          <div className="p-6">
            {loading ? (
              <p className="text-sm text-gray-400">{t('admin.loading')}</p>
            ) : (
              <DataTable
                columns={columns}
                data={subscribers}
                emptyMessage={t('admin.newsletter.empty')}
                emptyIcon="📰"
                mobileColumns={['email', 'createdAt']}
              />
            )}
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}
