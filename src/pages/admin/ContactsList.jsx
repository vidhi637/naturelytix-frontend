import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFetch } from '../../hooks/useFetch';
import { getContacts } from '../../api/contacts';
import AdminLayout from '../../components/layout/AdminLayout';
import Card from '../../components/ui/Card';
import DataTable from '../../components/ui/DataTable';
import Alert from '../../components/ui/Alert';

function truncate(str, n = 60) {
  if (!str) return '—';
  return str.length > n ? str.slice(0, n) + '…' : str;
}

export default function ContactsList() {
  const { t } = useTranslation();
  const { data, loading, error } = useFetch(getContacts);
  const contacts = data?.data ?? [];

  const columns = [
    { key: 'name', label: t('admin.contacts.name') },
    { key: 'email', label: t('admin.contacts.email') },
    { key: 'phone', label: t('admin.contacts.phone') },
    { key: 'subject', label: t('admin.contacts.subject') },
    {
      key: 'message',
      label: t('admin.contacts.message'),
      render: (r) => (
        <span title={r.message} className="cursor-default">{truncate(r.message)}</span>
      ),
    },
    {
      key: 'createdAt',
      label: t('admin.contacts.created'),
      render: (r) => r.createdAt ? new Date(r.createdAt).toLocaleDateString() : '—',
    },
  ];

  return (
    <AdminLayout>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-primary-800">{t('admin.contacts.title')}</h1>
        {error && <Alert message={t('admin.error')} />}

        <Card className="p-0 overflow-hidden">
          <div className="p-6">
            {loading ? (
              <p className="text-sm text-gray-400">{t('admin.loading')}</p>
            ) : (
              <DataTable
                columns={columns}
                data={contacts}
                emptyMessage={t('admin.contacts.empty')}
                emptyIcon="✉️"
                mobileColumns={['name', 'email', 'message', 'createdAt']}
              />
            )}
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}
