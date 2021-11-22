import create from "zustand";

interface UserState {
  name: string;
  id: string;
  avatar: string;
}

interface Mode {
  /** 暗黑模式,默认为true */
  isDarkMode: boolean;
  /** 专注写作模式，默认为false */
  isEditMode: boolean;
}

interface AppState {
  user: UserState;
  setUser: (user: UserState) => void;

  mode: Mode;
  setMode: (mode: Partial<Mode>) => void;
}

export const useStore = create<AppState>((set) => ({
  user: {
    id: "",
    name: "",
    avatar: "",
  },
  setUser: (user) =>
    set((state) => ({ ...state, user: { ...state.user, ...user } })),

  mode: { isDarkMode: true, isEditMode: false },
  setMode: (mode) =>
    set((state) => {
      if (mode.isDarkMode) {
        document.body.setAttribute("arco-theme", "dark");
      } else {
        document.body.setAttribute("arco-theme", "light");
      }

      return { ...state, mode: { ...state.mode, ...mode } };
    }),
}));
