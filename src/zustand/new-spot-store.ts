import { FishingSpot } from "@prisma/client";
import { boolean } from "zod";
import { create } from "zustand";
import { fishTypes } from "../const/fish-types";

export type NewSpotFields = {
  name: string;
  position: Position | null;
  city: string;
  province: string;
  accommodation: boolean;
  tent: boolean;
  contact: string;
  night_fishing: boolean;
  spinning: boolean;
  description: string;
  area: string;
  isPaid: boolean;
  prices: { title: string; value: string }[];
  fish_types: (typeof fishTypes)[number][];
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
  spinning: false,
  contact: "",
  lat: 0,
  lng: 0,
  area: "",
  description: "",
  fish_types: [],
  setField: (key, value) => set((state) => ({ ...state, [key]: value })),
}));
