import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NAV_LINKS = [
  { to: '/admin', label: 'admin.sidebar.dashboard', icon: '📊', end: true },
  { to: '/admin/leads', label: 'admin.sidebar.leads', icon: '👥' },
  { to: '/admin/contacts', label: 'admin.sidebar.contacts', icon: '✉️' },
  { to: '/admin/demo-requests', label: 'admin.sidebar.demos', icon: '📅' },
  { to: '/admin/newsletter', label: 'admin.sidebar.newsletter', icon: '📰' },
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
    <div className="flex flex-col gap-4">
      {/* Mobile: horizontal scrollable nav */}
      <nav className="sm:hidden flex gap-1 overflow-x-auto pb-1">
        {NAV_LINKS.map(({ to, label, icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
                isActive ? 'bg-primary-100 text-primary-800' : 'text-gray-600 bg-gray-50'
              }`
            }
          >
            <span>{icon}</span>
            {t(label)}
          </NavLink>
        ))}
      </nav>

      {/* Desktop: sidebar + content */}
      <div className="flex gap-6">
        <aside className="hidden sm:flex flex-col gap-1 w-48 shrink-0">
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
