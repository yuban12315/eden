import create from "zustand";

import { useLocalStorage } from "../hooks/index";
import { Collection } from "./IndexDB/Models/Collection";

export const LocalConfigKey = "EDEN_LOCAL_CONFIG";
// this is not a react hook
// eslint-disable-next-line react-hooks/rules-of-hooks
const [, saveConfig] = useLocalStorage<AppState>(LocalConfigKey);

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

export interface AppState {
  user: UserState;
  setUser: (user: UserState) => void;

  mode: Mode;
  setMode: (mode: Partial<Mode>) => void;

  collectionData?: Collection;
  setCollectionData: (data: Collection) => void;
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
      mode.isDarkMode
        ? document.body.setAttribute("arco-theme", "dark")
        : document.body.setAttribute("arco-theme", "light");

      const finalMode = { ...state.mode, ...mode };
      saveConfig({ mode: finalMode });

      return { ...state, mode: finalMode };
    }),

  setCollectionData: (data) =>
    set((state) => ({
      ...state,
      collectionData: data,
    })),
}));
