// Authentication context for global auth state
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import type { AuthState, LoginCredentials, RegisterData } from '../types';
import * as authApi from '../api/auth';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: true,
  });

  // Check if user is logged in on mount
  useEffect(() => {
    authApi
      .getCurrentUser()
      .then((user) => {
        setState({ isAuthenticated: true, user, loading: false });
      })
      .catch(() => {
        setState({ isAuthenticated: false, user: null, loading: false });
      });
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setState((s) => ({ ...s, loading: true }));
    try {
      const user = await authApi.login(credentials);
      setState({ isAuthenticated: true, user, loading: false });
    } catch (error) {
      setState({ isAuthenticated: false, user: null, loading: false });
      throw error;
    }
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    setState((s) => ({ ...s, loading: true }));
    try {
      const user = await authApi.register(data);
      setState({ isAuthenticated: true, user, loading: false });
    } catch (error) {
      setState((s) => ({ ...s, loading: false }));
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    await authApi.logout();
    setState({ isAuthenticated: false, user: null, loading: false });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
