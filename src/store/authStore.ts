import { create } from 'zustand';

interface AuthStore {
  accessToken: string;
  setAccessToken: (token: string) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  accessToken: '',
  setAccessToken: (token: string) => set({ accessToken: token }),
}));
