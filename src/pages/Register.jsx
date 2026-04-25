import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { useForm } from '../hooks/useForm';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';

export default function Register() {
  const { t } = useTranslation();
  const { register } = useAuth();
  const navigate = useNavigate();
  const { values, errors, setErrors, handleChange } = useForm({
    fullName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};
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
    if (!validate()) return;
    setLoading(true);
    try {
      await register(values.fullName || null, values.email, values.password, values.passwordConfirmation);
      navigate('/dashboard');
    } catch (err) {
      const msg = err.response?.data?.errors?.[0]?.message;
      setServerError(msg || t('errors.register_failed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-start pt-8">
      <Card className="w-full max-w-md">
        <div className="flex flex-col gap-6">
          <div className="text-center">
            <span className="text-4xl">🍄</span>
            <h1 className="text-2xl font-bold text-primary-800 mt-2">{t('auth.register_title')}</h1>
            <p className="text-gray-500 text-sm mt-1">{t('auth.register_subtitle')}</p>
          </div>

          <Alert message={serverError} />

          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
            <Input
              label={t('auth.full_name')}
              type="text"
              name="fullName"
              value={values.fullName}
              onChange={handleChange}
              error={errors.fullName}
              placeholder="Raju Kumar"
              autoComplete="name"
            />
            <Input
              label={t('auth.email')}
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="you@example.com"
              autoComplete="email"
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
              {loading ? t('auth.registering') : t('auth.register_btn')}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500">
            {t('auth.have_account')}{' '}
            <Link to="/login" className="text-primary-600 font-medium hover:underline">
              {t('auth.login_link')}
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
