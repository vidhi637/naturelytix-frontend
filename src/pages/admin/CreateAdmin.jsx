import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from '../../hooks/useForm';
import { createAdminUser } from '../../api/admin';
import AdminLayout from '../../components/layout/AdminLayout';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Alert from '../../components/ui/Alert';

export default function CreateAdmin() {
  const { t } = useTranslation();
  const { values, errors, setErrors, handleChange, reset } = useForm({
    fullName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!values.fullName) errs.fullName = t('errors.required');
    if (!values.email) errs.email = t('errors.required');
    if (!values.password) errs.password = t('errors.required');
    else if (values.password.length < 8) errs.password = t('errors.password_min');
    else if (values.password.length > 32) errs.password = t('errors.password_max');
    if (values.passwordConfirmation !== values.password) errs.passwordConfirmation = t('errors.password_mismatch');
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    setSuccess('');
    if (!validate()) return;
    setLoading(true);
    try {
      await createAdminUser({ ...values, role: 'admin' });
      setSuccess(t('admin.create_admin.success'));
      reset();
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.errors?.[0]?.message;
      setServerError(msg || t('errors.generic'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col gap-4 max-w-md">
        <h1 className="text-2xl font-bold text-primary-800">{t('admin.create_admin.title')}</h1>

        {success && <Alert message={success} type="success" />}
        {serverError && <Alert message={serverError} />}

        <Card>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
            <Input
              label={t('auth.full_name')}
              type="text"
              name="fullName"
              value={values.fullName}
              onChange={handleChange}
              error={errors.fullName}
              placeholder="Admin Name"
              autoComplete="off"
            />
            <Input
              label={t('auth.email')}
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="admin@example.com"
              autoComplete="off"
            />
            <Input
              label={t('auth.password')}
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              error={errors.password}
              placeholder="••••••••"
              autoComplete="new-password"
            />
            <Input
              label={t('auth.confirm_password')}
              type="password"
              name="passwordConfirmation"
              value={values.passwordConfirmation}
              onChange={handleChange}
              error={errors.passwordConfirmation}
              placeholder="••••••••"
              autoComplete="new-password"
            />
            <Button type="submit" loading={loading} className="w-full mt-1">
              {loading ? t('admin.create_admin.submitting') : t('admin.create_admin.submit')}
            </Button>
          </form>
        </Card>
      </div>
    </AdminLayout>
  );
}
