import { create } from "zustand";
import { type FishingSpotData } from "../../schemas/fishing-spot.schema";

type EditFields = Omit<FishingSpotData, "images" | "contact">;

type EditSpotState = EditFields & {
  setField: <K extends keyof FishingSpotData>(
    key: K,
    value: FishingSpotData[K]
  ) => void;
  setEditableFields: (data: EditFields) => void;
};

export const useEditSpotStore = create<EditSpotState>((set) => ({
  name: "",
  prices: [],
  city: "",
  province: "",
  isPaid: false,
  accommodation: false,
  tent: false,
  night_fishing: false,
  spinning: false,
  lat: 0,
  lng: 0,
  area: "",
  description: "",
  fish_types: [],
  setField: (key, value) => set((state) => ({ ...state, [key]: value })),
  setEditableFields: (newState) => set((state) => ({ ...state, ...newState })),
}));
