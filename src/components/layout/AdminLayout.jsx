import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NAV_LINKS = [
  { to: '/admin', label: 'admin.sidebar.dashboard', icon: '📊', end: true },
  { to: '/admin/leads', label: 'admin.sidebar.leads', icon: '👥' },
  { to: '/admin/contacts', label: 'admin.sidebar.contacts', icon: '✉️' },
  { to: '/admin/demo-requests', label: 'admin.sidebar.demos', icon: '📅' },
  { to: '/admin/newsletter', label: 'admin.sidebar.newsletter', icon: '📰' },
  { to: '/admin/create-admin', label: 'admin.sidebar.create_admin', icon: '🔑' },
];

function SideLink({ to, label, icon, end }) {
  const { t } = useTranslation();
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
          isActive ? 'bg-primary-100 text-primary-800' : 'text-gray-600 hover:bg-gray-100'
        }`
      }
    >
      <span>{icon}</span>
      {t(label)}
    </NavLink>
  );
}

export default function AdminLayout({ children }) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col min-h-0">
      {/* Mobile: fixed bottom nav */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 flex justify-around">
        {NAV_LINKS.map(({ to, label, icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center flex-1 py-2 text-xs font-medium transition-colors ${
                isActive ? 'text-primary-700' : 'text-gray-400'
              }`
            }
          >
            <span className="text-lg leading-none">{icon}</span>
            <span className="mt-0.5 leading-tight">{t(label)}</span>
          </NavLink>
        ))}
      </nav>

      {/* Mobile: content with bottom padding so nav doesn't overlap */}
      <div className="sm:hidden pb-20">
        {children}
      </div>

      {/* Desktop: sidebar + content */}
      <div className="hidden sm:flex gap-6">
        <aside className="flex flex-col gap-1 w-48 shrink-0">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-1">
            Admin
          </p>
          {NAV_LINKS.map((link) => (
            <SideLink key={link.to} {...link} />
          ))}
        </aside>

        <main className="flex-1 min-w-0 flex flex-col gap-6">{children}</main>
      </div>
    </div>
  );
}
