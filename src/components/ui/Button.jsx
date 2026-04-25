import React from 'react';

const variants = {
  primary: 'bg-primary-600 hover:bg-primary-700 text-white',
  secondary: 'bg-white border border-primary-300 hover:bg-primary-50 text-primary-700',
  ghost: 'text-primary-700 hover:bg-primary-100',
};

export default function Button({ children, variant = 'primary', loading = false, className = '', ...props }) {
  return (
    <button
      className={`
        inline-flex items-center justify-center px-5 py-2.5 rounded-xl font-medium text-base
        transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary-400
        disabled:opacity-60 disabled:cursor-not-allowed
        ${variants[variant]} ${className}
      `}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
          {children}
        </span>
      ) : children}
    </button>
  );
}
