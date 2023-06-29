import { create } from "zustand";

type NewSpotState = {
  position: Position | null;
  city: string;
  province: string;
  setPosition: (newPosition: Position) => void;
  setCity: (v: string) => void;
  setProvince: (v: string) => void;
};

export const useNewSpotStore = create<NewSpotState>((set) => ({
  position: null,
  city: "",
  province: "",
  setPosition: (newPosition) =>
    set((state) => ({ ...state, position: newPosition })),
  setCity: (city) => set((state) => ({ ...state, city })),
  setProvince: (province) => set((state) => ({ ...state, province })),
}));
