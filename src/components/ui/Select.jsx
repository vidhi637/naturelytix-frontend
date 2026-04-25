import React from 'react';

export default function Select({ label, error, children, className = '', ...props }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <select
        className={`
          w-full px-4 py-2.5 rounded-xl border text-base bg-white
          focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent
          transition-colors duration-150
          ${error ? 'border-red-400' : 'border-primary-200'}
          ${className}
        `}
        {...props}
      >
        {children}
      </select>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
