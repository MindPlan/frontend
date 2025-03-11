import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
	accessToken: string | null;
	refreshToken: string | null;
	clearTokens: () => void;
	isAuthenticated: boolean;
	login: (accessToken: string, refreshToken: string) => void;
	logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      clearTokens: () => set({ accessToken: null, refreshToken: null }),
      isAuthenticated: false,
      login: (accessToken, refreshToken) => {
        set({
          accessToken,
          refreshToken,
          isAuthenticated: true,
        })
        
        window.location.replace('/dashboard');
      },
      logout: () => {
        set({
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        })
        
        window.location.replace('/login');
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);

export default useAuthStore;
