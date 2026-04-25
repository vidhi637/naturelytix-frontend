import React from 'react';

export default function EmptyState({ icon = '📭', message }) {
  return (
    <div className="flex flex-col items-center py-16 gap-3 text-gray-400">
      <span className="text-4xl">{icon}</span>
      <p className="text-sm">{message}</p>
    </div>
  );
}
