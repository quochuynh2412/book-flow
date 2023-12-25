import { create } from "zustand";

interface AuthState {
  loggedIn: boolean;
  login: (loggedIn: boolean) => void;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  loggedIn: false,
  login() {
    set({ loggedIn: true });
  },
  logout() {
    set({ loggedIn: false });
  },
}));
