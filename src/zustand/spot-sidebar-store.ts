import { create } from "zustand";

type SpotSidebarStore = {
  isOpen: boolean;
  spotId: string;
  setSpotId: (id: string | false) => void;
  toggleIsOpen: () => void;
};

const useSpotSidebarStore = create<SpotSidebarStore>((set) => ({
  isOpen: false,
  spotId: "",
  setSpotId: (id) =>
    set((state) => {
      if (id) {
        return { ...state, spotId: id, isOpen: true };
      } else {
        return { ...state, spotId: "", isOpen: false };
      }
    }),
  toggleIsOpen: () => set((state) => ({ ...state, isOpen: !state.isOpen })),
}));

export default useSpotSidebarStore;
