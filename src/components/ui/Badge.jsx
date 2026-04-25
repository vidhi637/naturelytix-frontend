import React from 'react';

const STATUS_STYLES = {
  new: 'bg-blue-100 text-blue-700',
  contacted: 'bg-yellow-100 text-yellow-700',
  qualified: 'bg-primary-100 text-primary-700',
  closed: 'bg-gray-100 text-gray-600',
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-primary-100 text-primary-700',
  cancelled: 'bg-red-100 text-red-600',
  active: 'bg-primary-100 text-primary-700',
  inactive: 'bg-gray-100 text-gray-500',
};

export default function Badge({ status }) {
  const key = status?.toLowerCase();
  const style = STATUS_STYLES[key] ?? 'bg-gray-100 text-gray-500';
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${style}`}>
      {status || '—'}
    </span>
  );
}
