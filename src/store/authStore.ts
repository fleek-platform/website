import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthStore {
  accessToken: string;
  setAccessToken: (token: string) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      accessToken: '',
      setAccessToken: (token: string) => set({ accessToken: token }),
    }),
    {
      name: 'fleek-website-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
