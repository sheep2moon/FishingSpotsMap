import { create } from "zustand";
import { type FSpotData } from "../../schemas/fishing-spot.schema";

type EditFields = Omit<FSpotData, "images">;

type EditSpotState = EditFields & {
  setField: <K extends keyof FSpotData>(key: K, value: FSpotData[K]) => void;
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
  contact_email: "",
  contact_instagram: "",
  contact_page: "",
  contact_phone: null,
  fish_types: [],
  setField: (key, value) => set((state) => ({ ...state, [key]: value })),
  setEditableFields: (newState) => set((state) => ({ ...state, ...newState })),
}));
