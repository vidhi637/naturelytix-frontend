import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useFetch } from '../../hooks/useFetch';
import { getLead, updateLeadStatus } from '../../api/admin';
import AdminLayout from '../../components/layout/AdminLayout';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import Alert from '../../components/ui/Alert';

function DetailRow({ label, value }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 py-3 border-b border-primary-50 last:border-0">
      <span className="text-sm font-medium text-gray-500 sm:w-36 shrink-0">{label}</span>
      <span className="text-base text-gray-800 break-words">{value || '—'}</span>
    </div>
  );
}

const LEAD_STATUSES = ['new', 'contacted', 'qualified', 'closed'];

export default function LeadDetail() {
  const { id } = useParams();
  const { t } = useTranslation();
  const { data, loading, error, refetch } = useFetch(() => getLead(id));
  const lead = data?.data;

  const [selectedStatus, setSelectedStatus] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const currentStatus = selectedStatus || lead?.status || 'new';

  const handleStatusUpdate = async () => {
    setSaveError('');
    setSaveSuccess(false);
    setSaving(true);
    try {
      await updateLeadStatus(id, currentStatus);
      setSaveSuccess(true);
      refetch();
    } catch {
      setSaveError(t('admin.error'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/leads"
            className="text-sm text-primary-600 hover:underline font-medium"
          >
            ← {t('admin.back')}
          </Link>
          <h1 className="text-2xl font-bold text-primary-800">{lead?.name ?? '...'}</h1>
          {lead?.status && <Badge status={lead.status} />}
        </div>

        {error && <Alert message={t('admin.error')} />}

        {loading ? (
          <p className="text-sm text-gray-400">{t('admin.loading')}</p>
        ) : lead && (
          <div className="flex flex-col gap-4">
            <Card>
              <h2 className="text-base font-semibold text-primary-800 mb-2">{t('admin.leads.title')}</h2>
              <DetailRow label={t('admin.leads.name')} value={lead.name} />
              <DetailRow label={t('admin.leads.email')} value={lead.email} />
              <DetailRow label={t('admin.leads.phone')} value={lead.phone} />
              <DetailRow label={t('admin.leads.role')} value={lead.role} />
              <DetailRow label={t('admin.leads.source')} value={lead.source} />
              <DetailRow label={t('admin.leads.created')} value={lead.createdAt ? new Date(lead.createdAt).toLocaleString() : '—'} />
              <DetailRow
                label={t('admin.leads.status')}
                value={<Badge status={lead.status} />}
              />
              {lead.message && (
                <DetailRow label="Message" value={lead.message} />
              )}
            </Card>

            <Card>
              <h2 className="text-base font-semibold text-primary-800 mb-4">{t('admin.leads.update_status')}</h2>
              {(saveError || saveSuccess) && (
                <Alert
                  message={saveSuccess ? '✓ Status updated.' : saveError}
                  type={saveSuccess ? 'success' : 'error'}
                />
              )}
              <div className="flex items-end gap-3 mt-3">
                <div className="flex-1">
                  <Select
                    label={t('admin.leads.status')}
                    value={currentStatus}
                    onChange={(e) => { setSelectedStatus(e.target.value); setSaveSuccess(false); }}
                  >
                    {LEAD_STATUSES.map((s) => (
                      <option key={s} value={s} className="capitalize">{s}</option>
                    ))}
                  </Select>
                </div>
                <Button onClick={handleStatusUpdate} loading={saving}>
                  {t('admin.leads.save')}
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
