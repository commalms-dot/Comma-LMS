import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  userId: number | null;
  user: any | null; // store the full user object
  setAuth: (token: string, userId: number, user?: any) => void;
  clearAuth: () => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      token: null,
      userId: null,
      user: null, // new field
      setAuth: (token, userId, user) =>
        set({ token, userId, user: user || null }),
      clearAuth: () => set({ token: null, userId: null, user: null }),
    }),
    { name: "auth-store" }, // localStorage
  ),
);
