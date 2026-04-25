import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFetch } from '../../hooks/useFetch';
import { getDemoRequests, updateDemoStatus } from '../../api/demoRequests';
import AdminLayout from '../../components/layout/AdminLayout';
import Card from '../../components/ui/Card';
import DataTable from '../../components/ui/DataTable';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import Select from '../../components/ui/Select';
import Alert from '../../components/ui/Alert';

const DEMO_STATUSES = ['pending', 'confirmed', 'cancelled'];

export default function DemoRequestsList() {
  const { t } = useTranslation();
  const { data, loading, error, refetch } = useFetch(getDemoRequests);
  const demos = data?.data ?? [];

  const [statusModal, setStatusModal] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [saving, setSaving] = useState(false);
  const [actionError, setActionError] = useState('');

  const openStatusModal = (demo) => {
    setStatusModal(demo);
    setSelectedStatus(demo.status ?? 'pending');
    setActionError('');
  };

  const handleStatusSave = async () => {
    if (!statusModal) return;
    setSaving(true);
    try {
      await updateDemoStatus(statusModal.id, selectedStatus);
      setStatusModal(null);
      refetch();
    } catch {
      setActionError(t('admin.error'));
    } finally {
      setSaving(false);
    }
  };

  const columns = [
    { key: 'name', label: t('admin.demos.name') },
    { key: 'email', label: t('admin.demos.email') },
    { key: 'phone', label: t('admin.demos.phone') },
    { key: 'farmSize', label: t('admin.demos.farm_size') },
    {
      key: 'preferredDate',
      label: t('admin.demos.preferred_date'),
      render: (r) => r.preferredDate ? new Date(r.preferredDate).toLocaleDateString() : '—',
    },
    { key: 'status', label: t('admin.demos.status'), render: (r) => <Badge status={r.status ?? 'pending'} /> },
    {
      key: 'createdAt',
      label: t('admin.demos.created'),
      render: (r) => r.createdAt ? new Date(r.createdAt).toLocaleDateString() : '—',
    },
    {
      key: 'actions',
      label: '',
      render: (r) => (
        <button
          onClick={() => openStatusModal(r)}
          className="text-xs text-yellow-600 hover:underline font-medium whitespace-nowrap"
        >
          {t('admin.demos.update_status')}
        </button>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-primary-800">{t('admin.demos.title')}</h1>
        {(error || actionError) && <Alert message={error || actionError} />}

        <Card className="p-0 overflow-hidden">
          <div className="p-6">
            {loading ? (
              <p className="text-sm text-gray-400">{t('admin.loading')}</p>
            ) : (
              <DataTable
                columns={columns}
                data={demos}
                emptyMessage={t('admin.demos.empty')}
                emptyIcon="📅"
              />
            )}
          </div>
        </Card>
      </div>

      <Modal
        isOpen={!!statusModal}
        onClose={() => setStatusModal(null)}
        title={t('admin.demos.update_status')}
      >
        <div className="flex flex-col gap-4">
          <Select
            label={t('admin.demos.status')}
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            {DEMO_STATUSES.map((s) => (
              <option key={s} value={s} className="capitalize">{s}</option>
            ))}
          </Select>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setStatusModal(null)}>
              {t('common.cancel')}
            </Button>
            <Button onClick={handleStatusSave} loading={saving}>
              {t('admin.demos.save')}
            </Button>
          </div>
        </div>
      </Modal>
    </AdminLayout>
  );
}
