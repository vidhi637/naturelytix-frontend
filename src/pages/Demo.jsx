import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from '../hooks/useForm';
import { submitDemoRequest } from '../api/demoRequests';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';

export default function Demo() {
  const { t } = useTranslation();
  const { values, errors, setErrors, handleChange, reset } = useForm({
    name: '',
    email: '',
    phone: '',
    farmSize: '',
    preferredDate: '',
  });
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!values.name.trim()) errs.name = t('errors.required');
    if (!values.email.trim()) errs.email = t('errors.required');
    if (!values.phone.trim()) errs.phone = t('errors.required');
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    if (!validate()) return;
    setLoading(true);
    try {
      await submitDemoRequest({
        name: values.name,
        email: values.email,
        phone: values.phone,
        farmSize: values.farmSize || undefined,
        preferredDate: values.preferredDate || undefined,
      });
      setSuccess(true);
      reset();
    } catch (err) {
      setServerError(err?.response?.data?.message || t('errors.generic'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-start pt-4">
      <Card className="w-full max-w-lg">
        <div className="flex flex-col gap-6">
          <div className="text-center">
            <span className="text-4xl">📅</span>
            <h1 className="text-2xl font-bold text-primary-800 mt-2">{t('demo.title')}</h1>
            <p className="text-gray-500 text-sm mt-1">{t('demo.subtitle')}</p>
          </div>

          <Alert message={success ? t('demo.success') : serverError} type={success ? 'success' : 'error'} />

          {!success && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
              <Input
                label={t('demo.name')}
                name="name"
                value={values.name}
                onChange={handleChange}
                error={errors.name}
                placeholder="Raju Kumar"
              />
              <Input
                label={t('demo.email')}
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="you@example.com"
              />
              <Input
                label={t('demo.phone')}
                type="tel"
                name="phone"
                value={values.phone}
                onChange={handleChange}
                error={errors.phone}
                placeholder="+91 98765 43210"
              />
              <Input
                label={t('demo.farm_size')}
                name="farmSize"
                value={values.farmSize}
                onChange={handleChange}
                placeholder={t('demo.farm_size_placeholder')}
              />
              <Input
                label={t('demo.preferred_date')}
                type="date"
                name="preferredDate"
                value={values.preferredDate}
                onChange={handleChange}
              />
              <Button type="submit" loading={loading} className="w-full mt-1">
                {loading ? t('demo.submitting') : t('demo.submit')}
              </Button>
            </form>
          )}
        </div>
      </Card>
    </div>
  );
}
