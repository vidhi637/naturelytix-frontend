import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { useForm } from '../hooks/useForm';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';

export default function Login() {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();
  const { values, errors, setErrors, handleChange } = useForm({ email: '', password: '' });
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!values.email) errs.email = t('errors.required');
    if (!values.password) errs.password = t('errors.required');
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    if (!validate()) return;
    setLoading(true);
    try {
      await login(values.email, values.password);
      navigate('/dashboard');
    } catch (err) {
      setServerError(t('errors.login_failed'));
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
            <h1 className="text-2xl font-bold text-primary-800 mt-2">{t('auth.login_title')}</h1>
            <p className="text-gray-500 text-sm mt-1">{t('auth.login_subtitle')}</p>
          </div>

          <Alert message={serverError} />

          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
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
              autoComplete="current-password"
            />
            <Button type="submit" loading={loading} className="w-full mt-1">
              {loading ? t('auth.logging_in') : t('auth.login_btn')}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500">
            {t('auth.no_account')}{' '}
            <Link to="/register" className="text-primary-600 font-medium hover:underline">
              {t('auth.signup_link')}
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
