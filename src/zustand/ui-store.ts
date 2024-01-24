import { create } from "zustand";

type UiStore = {
  isLoginOpen: boolean;
  setIsLoginOpen: (v: boolean) => void;
};

const useUiStore = create<UiStore>((set) => ({
  isLoginOpen: false,
  setIsLoginOpen: (open) => set((state) => ({ ...state, isLoginOpen: open })),
}));

export default useUiStore;
