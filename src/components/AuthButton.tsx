import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export const AuthButton = (): React.JSX.Element => {
  const { user, logout, isLoading } = useAuth();

  const handleGoogleLogin = () => {
    // Redirect to server-side OAuth initiation
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
    window.location.href = `${apiUrl}/auth/google`;
  };

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="w-32 h-10 bg-stone-200 rounded-xl"></div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-medium text-stone-900">{user.name}</p>
          <p className="text-xs text-stone-500 capitalize">{user.tier} tier</p>
        </div>
        <button
          onClick={logout}
          className="px-3 sm:px-4 py-2 text-xs sm:text-sm bg-stone-200 hover:bg-stone-300 text-stone-900 font-medium rounded-lg sm:rounded-xl transition-all duration-300 hover:-translate-y-0.5 shadow-soft hover:shadow-medium cursor-pointer"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleGoogleLogin}
      className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-white hover:bg-stone-50 text-stone-900 font-medium rounded-lg sm:rounded-xl border border-stone-300 transition-all duration-300 hover:-translate-y-0.5 shadow-soft hover:shadow-medium cursor-pointer text-sm sm:text-base"
    >
      <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24">
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="#FBBC05"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        />
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
      </svg>
      <span className="hidden sm:inline">Sign in with Google</span>
      <span className="sm:hidden">Sign in</span>
    </button>
  );
};

