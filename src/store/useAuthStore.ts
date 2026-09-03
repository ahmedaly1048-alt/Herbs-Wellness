import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  isActive: boolean;
}

interface AuthStore {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  clearError: () => void;
  isAuthenticated: () => boolean;
  isAdmin: () => boolean;
  refreshAccessToken: () => Promise<boolean>;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isLoading: false,
      error: null,

      isAuthenticated: () => !!get().accessToken && !!get().user,
      isAdmin: () => get().user?.role === 'admin',

      clearError: () => set({ error: null }),

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          });
          const data = await res.json();

          if (!res.ok) {
            set({ error: data.message || 'Login failed.', isLoading: false });
            return false;
          }

          set({
            user: data.user,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            isLoading: false,
            error: null,
          });
          return true;
        } catch {
          set({ error: 'Unable to connect. Please try again.', isLoading: false });
          return false;
        }
      },

      register: async (name, email, password) => {
        set({ isLoading: true, error: null });
        try {
          const res = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
          });
          const data = await res.json();

          if (!res.ok) {
            set({ error: data.message || 'Registration failed.', isLoading: false });
            return false;
          }

          set({
            user: data.user,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            isLoading: false,
            error: null,
          });
          return true;
        } catch {
          set({ error: 'Unable to connect. Please try again.', isLoading: false });
          return false;
        }
      },

      logout: async () => {
        const { accessToken } = get();
        try {
          if (accessToken) {
            await fetch(`${API_URL}/auth/logout`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
              },
            });
          }
        } catch {
          // Silent fail — clear local state regardless
        }
        set({ user: null, accessToken: null, refreshToken: null });
      },

      refreshAccessToken: async () => {
        const { refreshToken } = get();
        if (!refreshToken) return false;
        try {
          const res = await fetch(`${API_URL}/auth/refresh`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken }),
          });
          const data = await res.json();

          if (!res.ok) {
            set({ user: null, accessToken: null, refreshToken: null });
            return false;
          }

          set({ accessToken: data.accessToken, refreshToken: data.refreshToken });
          return true;
        } catch {
          return false;
        }
      },
    }),
    {
      name: 'herbs-auth-storage',
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }),
    }
  )
);
