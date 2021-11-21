import create from "zustand";

interface UserState {
  name: string;
  id: string;
  avator: string;
}

interface AppState {
  user: UserState;
  setUser: (user: UserState) => void;
}

export const useStore = create<AppState>((set) => ({
  user: {
    id: "",
    name: "",
    avator: "",
  },
  setUser: (user) =>
    set((state) => ({ ...state, user: { ...state.user, ...user } })),
}));
