import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useFetch } from '../../hooks/useFetch';
import { getLeads, updateLeadStatus, deleteLead } from '../../api/admin';
import AdminLayout from '../../components/layout/AdminLayout';
import Card from '../../components/ui/Card';
import DataTable from '../../components/ui/DataTable';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import Select from '../../components/ui/Select';
import Alert from '../../components/ui/Alert';

const LEAD_STATUSES = ['new', 'contacted', 'qualified', 'closed'];

export default function LeadsList() {
  const { t } = useTranslation();
  const { data, loading, error, refetch } = useFetch(getLeads);
  const leads = data?.data ?? [];

  const [statusModal, setStatusModal] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [saving, setSaving] = useState(false);
  const [actionError, setActionError] = useState('');

  const openStatusModal = (lead) => {
    setStatusModal(lead);
    setSelectedStatus(lead.status ?? 'new');
    setActionError('');
  };

  const handleStatusSave = async () => {
    if (!statusModal) return;
    setSaving(true);
    try {
      await updateLeadStatus(statusModal.id, selectedStatus);
      setStatusModal(null);
      refetch();
    } catch {
      setActionError(t('admin.error'));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (lead) => {
    if (!window.confirm(t('admin.leads.confirm_delete'))) return;
    try {
      await deleteLead(lead.id);
      refetch();
    } catch {
      setActionError(t('admin.error'));
    }
  };

  const columns = [
    { key: 'name', label: t('admin.leads.name') },
    { key: 'email', label: t('admin.leads.email') },
    { key: 'role', label: t('admin.leads.role'), render: (r) => <span className="capitalize">{r.role ?? '—'}</span> },
    { key: 'source', label: t('admin.leads.source') },
    { key: 'status', label: t('admin.leads.status'), render: (r) => <Badge status={r.status} /> },
    {
      key: 'createdAt',
      label: t('admin.leads.created'),
      render: (r) => r.createdAt ? new Date(r.createdAt).toLocaleDateString() : '—',
    },
    {
      key: 'actions',
      label: t('admin.leads.actions'),
      render: (r) => (
        <div className="flex items-center gap-2">
          <Link
            to={`/admin/leads/${r.id}`}
            className="text-xs text-primary-600 hover:underline font-medium"
          >
            {t('admin.view')}
          </Link>
          <button
            onClick={() => openStatusModal(r)}
            className="text-xs text-yellow-600 hover:underline font-medium"
          >
            {t('admin.leads.update_status')}
          </button>
          <button
            onClick={() => handleDelete(r)}
            className="text-xs text-red-500 hover:underline font-medium"
          >
            {t('admin.leads.delete')}
          </button>
        </div>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-primary-800">{t('admin.leads.title')}</h1>
        {(error || actionError) && <Alert message={error || actionError} />}

        <Card className="p-0 overflow-hidden">
          <div className="p-6">
            {loading ? (
              <p className="text-sm text-gray-400">{t('admin.loading')}</p>
            ) : (
              <DataTable
                columns={columns}
                data={leads}
                emptyMessage={t('admin.leads.empty')}
                emptyIcon="👥"
                mobileColumns={['name', 'email', 'status', 'actions']}
              />
            )}
          </div>
        </Card>
      </div>

      <Modal
        isOpen={!!statusModal}
        onClose={() => setStatusModal(null)}
        title={t('admin.leads.update_status')}
      >
        <div className="flex flex-col gap-4">
          <Select
            label={t('admin.leads.status')}
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            {LEAD_STATUSES.map((s) => (
              <option key={s} value={s} className="capitalize">{s}</option>
            ))}
          </Select>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setStatusModal(null)}>
              {t('common.cancel')}
            </Button>
            <Button onClick={handleStatusSave} loading={saving}>
              {t('admin.leads.save')}
            </Button>
          </div>
        </div>
      </Modal>
    </AdminLayout>
  );
}
