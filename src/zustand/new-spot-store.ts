import { create } from "zustand";
import type {
  FSpotImageWithFile,
  FSpotData,
} from "../../schemas/fishing-spot.schema";

// type StateFields = Omit<FishingSpotData, "images"> & {
//   images: EditableImage[];
// };

type NewSpotState = Omit<FSpotData, "images"> & {
  setField: <K extends keyof FSpotData>(key: K, value: FSpotData[K]) => void;
  images: FSpotImageWithFile[];
};

export const useNewSpotStore = create<NewSpotState>((set) => ({
  name: "",
  prices: [],
  city: "",
  province: "",
  accommodation: false,
  tent: false,
  night_fishing: false,
  images: [],
  spinning: false,
  contact: "",
  lat: 0,
  lng: 0,
  area: "",
  description: "",
  contact_email: undefined,
  contact_phone: undefined,
  contact_instagram: undefined,
  contact_page: undefined,
  fish_types: [],
  setField: (key, value) => set((state) => ({ ...state, [key]: value })),
}));
