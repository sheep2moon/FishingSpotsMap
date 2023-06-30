import { FishingSpot } from "@prisma/client";
import { boolean } from "zod";
import { create } from "zustand";

export type NewSpotFields = {
  name: "";
  position: Position | null;
  city: "";
  province: "";
  accommodation: boolean;
  tent: boolean;
  contact: "";
  night_fishing: boolean;
  description: "";
  area: "";
  isPaid: boolean;
  prices: { title: string; value: string }[];
  fish_types: "";
};

type NewSpotState = NewSpotFields & {
  setField: <K extends keyof NewSpotFields>(
    key: K,
    value: NewSpotFields[K]
  ) => void;
};

export const useNewSpotStore = create<NewSpotState>((set) => ({
  name: "",
  prices: [],
  position: null,
  city: "",
  province: "",
  isPaid: false,
  accommodation: false,
  tent: false,
  night_fishing: false,
  contact: "",
  lat: 0,
  lng: 0,
  area: "",
  description: "",
  fish_types: "",
  setField: (key, value) => set((state) => ({ ...state, [key]: value })),
}));
