import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export const UsageIndicator = (): React.JSX.Element => {
  const { user } = useAuth();

  if (!user) return <></>;

  const limit = user.tier === 'premium' ? 100 : 5;
  const remaining = Math.max(0, limit - user.imageCount);

  const getStatusColor = () => {
    if (remaining === 0) return 'text-red-600';
    if (remaining <= 1 && user.tier === 'free') return 'text-amber-600';
    return 'text-stone-700';
  };

  return (
    <div className="flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-1.5 sm:py-2 bg-stone-100 rounded-lg">
      <div className="flex items-center gap-1 sm:gap-2">
        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-stone-400"></div>
        <span className="text-xs font-medium text-stone-600 uppercase tracking-wide hidden sm:inline">
          {user.tier}
        </span>
        <span className="text-xs font-medium text-stone-600 uppercase tracking-wide sm:hidden">
          {user.tier === 'premium' ? 'PRO' : 'FREE'}
        </span>
      </div>
      <div className="text-xs font-medium">
        <span className={getStatusColor()}>
          {remaining}
        </span>
        <span className="text-stone-500 ml-1">
          <span className="hidden sm:inline">/ {limit} left</span>
          <span className="sm:hidden">left</span>
        </span>
      </div>
      {user.tier === 'free' && remaining <= 1 && (
        <button className="text-xs font-medium text-indigo-600 hover:text-indigo-700 transition-colors hidden sm:inline">
          Upgrade
        </button>
      )}
    </div>
  );
};
