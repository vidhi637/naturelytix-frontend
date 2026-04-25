import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from '../hooks/useForm';
import { unsubscribe } from '../api/newsletter';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';

export default function Unsubscribe() {
  const { t } = useTranslation();
  const { values, errors, setErrors, handleChange } = useForm({ email: '' });
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!values.email.trim()) errs.email = t('errors.required');
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    if (!validate()) return;
    setLoading(true);
    try {
      await unsubscribe(values.email);
      setSuccess(true);
    } catch (err) {
      const status = err?.response?.status;
      setServerError(status === 404 ? t('unsubscribe.not_found') : t('errors.generic'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-start pt-8">
      <Card className="w-full max-w-md">
        <div className="flex flex-col gap-6">
          <div className="text-center">
            <span className="text-4xl">📭</span>
            <h1 className="text-2xl font-bold text-primary-800 mt-2">{t('unsubscribe.title')}</h1>
            <p className="text-gray-500 text-sm mt-1">{t('unsubscribe.subtitle')}</p>
          </div>

          <Alert message={success ? t('unsubscribe.success') : serverError} type={success ? 'success' : 'error'} />

          {!success && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
              <Input
                label={t('unsubscribe.email')}
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="you@example.com"
              />
              <Button type="submit" loading={loading} className="w-full">
                {loading ? t('unsubscribe.submitting') : t('unsubscribe.submit')}
              </Button>
            </form>
          )}
        </div>
      </Card>
    </div>
  );
}
