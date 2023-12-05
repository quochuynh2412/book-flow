import { create } from "zustand";

interface AuthState {
  loggedIn: boolean;
  login: (loggedIn: boolean) => void;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  loggedIn: false,
  login() {
    console.log("called login");
    set({ loggedIn: true });
  },
  logout() {
    console.log("called logout");
    set({ loggedIn: false });
  },
}));
