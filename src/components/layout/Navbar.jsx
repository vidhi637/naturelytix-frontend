import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import LanguageToggle from '../ui/LanguageToggle';

export default function Navbar() {
  const { t } = useTranslation();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const isAdmin = user?.role === 'admin';

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="bg-white border-b border-primary-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary-700">
          <span className="text-2xl">🍄</span>
          <span>Naturelytix</span>
        </Link>

        {/* Desktop */}
        <div className="hidden sm:flex items-center gap-1">
          <LanguageToggle />
          {!isAdmin && (
            <>
              <Link to="/contact" className="text-sm font-medium text-gray-600 hover:text-primary-700 px-3 py-1.5 rounded-lg hover:bg-primary-50 transition-colors">
                {t('nav.contact')}
              </Link>
              <Link to="/demo" className="text-sm font-medium text-gray-600 hover:text-primary-700 px-3 py-1.5 rounded-lg hover:bg-primary-50 transition-colors">
                {t('nav.demo')}
              </Link>
            </>
          )}
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="text-sm font-medium text-gray-600 hover:text-primary-700 px-3 py-1.5 rounded-lg hover:bg-primary-50 transition-colors">
                {t('nav.dashboard')}
              </Link>
              {isAdmin && (
                <Link to="/admin" className="text-sm font-medium text-gray-600 hover:text-primary-700 px-3 py-1.5 rounded-lg hover:bg-primary-50 transition-colors">
                  {t('nav.admin')}
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="text-sm font-medium text-gray-600 hover:text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
              >
                {t('nav.logout')}
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-xl transition-colors">
                {t('nav.login')}
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden p-2 rounded-lg hover:bg-primary-50"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden bg-white border-t border-primary-100 px-4 py-3 flex flex-col gap-2">
          <LanguageToggle />
          {!isAdmin && (
            <>
              <Link to="/contact" onClick={closeMenu} className="text-sm font-medium text-gray-700 py-2">{t('nav.contact')}</Link>
              <Link to="/demo" onClick={closeMenu} className="text-sm font-medium text-gray-700 py-2">{t('nav.demo')}</Link>
            </>
          )}
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" onClick={closeMenu} className="text-sm font-medium text-gray-700 py-2">
                {t('nav.dashboard')}
              </Link>
              {isAdmin && (
                <Link to="/admin" onClick={closeMenu} className="text-sm font-medium text-gray-700 py-2">
                  {t('nav.admin')}
                </Link>
              )}
              <button onClick={() => { handleLogout(); closeMenu(); }} className="text-sm font-medium text-red-600 py-2 text-left">
                {t('nav.logout')}
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={closeMenu} className="text-sm font-medium text-primary-700 py-2">
                {t('nav.login')}
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
