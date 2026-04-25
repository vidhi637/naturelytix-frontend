import React from 'react';

export default function Alert({ message, type = 'error' }) {
  if (!message) return null;
  const styles = {
    error: 'bg-red-50 border-red-300 text-red-700',
    success: 'bg-primary-50 border-primary-300 text-primary-700',
  };
  return (
    <div className={`px-4 py-3 rounded-xl border text-sm ${styles[type]}`}>
      {message}
    </div>
  );
}
