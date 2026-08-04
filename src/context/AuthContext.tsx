import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '../types';
import { generateFakeJWT, parseFakeJWT } from '../utils/jwtUtils';

const TOKEN_KEY = 'auth_token';
const LEGACY_TOKEN_KEY = 'token';

const getInitialAuthState = (): { user: User | null; isAuthenticated: boolean } => {
  if (typeof window === 'undefined') {
    return { user: null, isAuthenticated: false };
  }
  try {
    const token = localStorage.getItem(TOKEN_KEY) || localStorage.getItem(LEGACY_TOKEN_KEY);
    if (token) {
      const payload = parseFakeJWT(token);
      const now = Math.floor(Date.now() / 1000);
      if (payload && payload.exp > now) {
        return {
          user: {
            id: 'usr-001',
            username: payload.username,
            name: payload.name || 'Galactic Administrator',
            email: payload.email || 'admin@holocron.sw',
            role: 'admin',
            createdAt: '2026-08-04T00:00:00.000Z',
          },
          isAuthenticated: true,
        };
      } else {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(LEGACY_TOKEN_KEY);
      }
    }
  } catch {
    // Ignore storage errors inSSR / test setup
  }
  return { user: null, isAuthenticated: false };
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState(() => getInitialAuthState());
  const [loading, setLoading] = useState<boolean>(false);

  const { user, isAuthenticated } = authState;

  // Silent Token Refresh Mechanism: Refresh token before expiration
  useEffect(() => {
    if (!isAuthenticated || !user) return;

    const refreshInterval = setInterval(() => {
      const currentToken = localStorage.getItem(TOKEN_KEY) || localStorage.getItem(LEGACY_TOKEN_KEY);
      if (currentToken) {
        const payload = parseFakeJWT(currentToken);
        const now = Math.floor(Date.now() / 1000);
        // Refresh token if within 5 minutes of expiry
        if (payload && payload.exp - now < 5 * 60) {
          const newToken = generateFakeJWT(user.username);
          localStorage.setItem(TOKEN_KEY, newToken);
        }
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(refreshInterval);
  }, [isAuthenticated, user]);

  const login = async (usernameInput: string, passwordInput: string): Promise<boolean> => {
    setLoading(true);
    // Simulate network latency
    await new Promise((resolve) => setTimeout(resolve, 300));

    if (usernameInput === 'admin' && passwordInput === '123456') {
      const token = generateFakeJWT(usernameInput);
      localStorage.setItem(TOKEN_KEY, token);
      const payload = parseFakeJWT(token);

      if (payload) {
        setAuthState({
          user: {
            id: 'usr-001',
            username: payload.username,
            name: payload.name || 'Galactic Administrator',
            email: payload.email || 'admin@holocron.sw',
            role: 'admin',
            createdAt: '2026-08-04T00:00:00.000Z',
          },
          isAuthenticated: true,
        });
      }
      setLoading(false);
      return true;
    }

    setLoading(false);
    return false;
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(LEGACY_TOKEN_KEY);
    setAuthState({ user: null, isAuthenticated: false });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

/* eslint-disable-next-line react-refresh/only-export-components */
export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

/* eslint-disable-next-line react-refresh/only-export-components */
export const useAuth = useAuthContext;
