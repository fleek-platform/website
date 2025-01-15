import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthStore {
  accessToken: string;
  setAccessToken: (token: string) => void;
}

// TODO: Maybe this should be exposed by the login button?
// Store name
const name = 'fleek-xyz-website-store';

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      accessToken: '',
      setAccessToken: (accessToken: string) => set({ accessToken }),
    }),
    {
      name,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
