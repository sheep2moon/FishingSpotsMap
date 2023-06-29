import { create } from "zustand";

type NewSpotState = {
  position: Position | null;
  setPosition: (newPosition: Position) => void;
};

export const useNewSpotStore = create<NewSpotState>((set) => ({
  position: null,
  setPosition: (newPosition) =>
    set((state) => ({ ...state, position: newPosition })),
}));
