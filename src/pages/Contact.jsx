import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from '../hooks/useForm';
import { submitContact } from '../api/contacts';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';

export default function Contact() {
  const { t } = useTranslation();
  const { values, errors, setErrors, handleChange, reset } = useForm({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};
    const name = values.name.trim();
    const email = values.email.trim();
    const message = values.message.trim();

    if (!name) errs.name = t('errors.required');
    else if (name.length < 2) errs.name = t('errors.name_min');

    if (!email) errs.email = t('errors.required');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = t('errors.invalid_email');

    if (!message) errs.message = t('errors.required');
    else if (message.length < 5) errs.message = t('errors.message_min');

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    if (!validate()) return;
    setLoading(true);
    try {
      await submitContact({
        name: values.name,
        email: values.email,
        phone: values.phone || undefined,
        subject: values.subject || undefined,
        message: values.message,
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
            <span className="text-4xl">✉️</span>
            <h1 className="text-2xl font-bold text-primary-800 mt-2">{t('contact.title')}</h1>
            <p className="text-gray-500 text-sm mt-1">{t('contact.subtitle')}</p>
          </div>

          <Alert message={success ? t('contact.success') : serverError} type={success ? 'success' : 'error'} />

          {!success && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
              <Input
                label={t('contact.name')}
                name="name"
                value={values.name}
                onChange={handleChange}
                error={errors.name}
                placeholder="Raju Kumar"
              />
              <Input
                label={t('contact.email')}
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="you@example.com"
              />
              <Input
                label={t('contact.phone_optional')}
                type="tel"
                name="phone"
                value={values.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
              />
              <Input
                label={t('contact.subject')}
                name="subject"
                value={values.subject}
                onChange={handleChange}
                placeholder={t('contact.subject_placeholder')}
              />
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">{t('contact.message')}</label>
                <textarea
                  name="message"
                  value={values.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder={t('contact.message_placeholder')}
                  className={`w-full px-4 py-2.5 rounded-xl border text-base bg-white resize-none
                    focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent
                    transition-colors duration-150
                    ${errors.message ? 'border-red-400' : 'border-primary-200'}`}
                />
                {errors.message && <p className="text-xs text-red-500">{errors.message}</p>}
              </div>
              <Button type="submit" loading={loading} className="w-full mt-1">
                {loading ? t('contact.submitting') : t('contact.submit')}
              </Button>
            </form>
          )}
        </div>
      </Card>
    </div>
  );
}
