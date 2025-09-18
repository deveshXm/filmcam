import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import type { AuthContextType, AuthUser } from '../../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps): React.JSX.Element => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      // Check for token in URL (from OAuth callback)
      const urlParams = new URLSearchParams(window.location.search);
      const tokenFromUrl = urlParams.get('token');
      const errorFromUrl = urlParams.get('error');

      if (tokenFromUrl) {
        // Store token and clean URL
        localStorage.setItem('authToken', tokenFromUrl);
        window.history.replaceState({}, document.title, window.location.pathname);
        await fetchUserProfile(tokenFromUrl);
        setIsLoading(false);
        return;
      }

      if (errorFromUrl) {
        console.error('OAuth error:', errorFromUrl);
        // Clean URL
        window.history.replaceState({}, document.title, window.location.pathname);
        setIsLoading(false);
        return;
      }

      // Check for existing token in localStorage
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const decoded = jwtDecode(token) as any;
          // Check if token is expired
          if (decoded.exp * 1000 > Date.now()) {
            // Fetch user profile to get current data
            await fetchUserProfile(token);
          } else {
            localStorage.removeItem('authToken');
          }
        } catch (error) {
          console.error('Invalid token:', error);
          localStorage.removeItem('authToken');
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const fetchUserProfile = async (token: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001/api'}/auth/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.data.user);
      } else {
        localStorage.removeItem('authToken');
      }
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      localStorage.removeItem('authToken');
    }
  };

  const login = (token: string) => {
    localStorage.setItem('authToken', token);
    fetchUserProfile(token);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  const refreshUserData = async () => {
    const token = localStorage.getItem('authToken');
    if (token && user) {
      await fetchUserProfile(token);
    }
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading,
    refreshUserData,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
