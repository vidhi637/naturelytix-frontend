import React from 'react';
import EmptyState from './EmptyState';

export default function DataTable({ columns, data, emptyMessage = 'No data.', emptyIcon, mobileColumns }) {
  if (!data || data.length === 0) {
    return <EmptyState icon={emptyIcon} message={emptyMessage} />;
  }

  const cardCols = mobileColumns
    ? columns.filter((c) => mobileColumns.includes(c.key))
    : columns;

  return (
    <>
      {/* Mobile: card list */}
      <div className={mobileColumns ? 'sm:hidden flex flex-col divide-y divide-primary-50' : 'hidden'}>
        {data.map((row, i) => (
          <div key={row.id ?? i} className="py-3 flex flex-col gap-1.5">
            {cardCols.map((col) => (
              <div key={col.key} className="flex items-start gap-2 text-sm">
                {col.label && (
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide w-24 shrink-0 pt-0.5">
                    {col.label}
                  </span>
                )}
                <span className="text-gray-700 flex-1 min-w-0 break-words">
                  {col.render ? col.render(row) : (row[col.key] ?? '—')}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Desktop: full table (always shown when no mobileColumns) */}
      <div className={mobileColumns ? 'hidden sm:block overflow-x-auto' : 'overflow-x-auto'}>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-primary-100">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider py-3 pr-6 whitespace-nowrap"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr
                key={row.id ?? i}
                className="border-b border-primary-50 last:border-0 hover:bg-gray-50 transition-colors"
              >
                {columns.map((col) => (
                  <td key={col.key} className="py-3 pr-6 text-gray-700 align-top">
                    {col.render ? col.render(row) : (row[col.key] ?? '—')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
