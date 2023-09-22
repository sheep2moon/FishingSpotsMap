import { create } from "zustand";
import { type FishingSpotData } from "../../schemas/fishing-spot.schema";

// type StateFields = Omit<FishingSpotData, "images"> & {
//   images: EditableImage[];
// };

type NewSpotState = FishingSpotData & {
  setField: <K extends keyof FishingSpotData>(
    key: K,
    value: FishingSpotData[K]
  ) => void;
};

export const useNewSpotStore = create<NewSpotState>((set) => ({
  name: "",
  prices: [],
  city: "",
  province: "",
  isPaid: false,
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
  email: "",
  phone: undefined,
  instagram: "",
  owner_page: "",
  fish_types: [],
  setField: (key, value) => set((state) => ({ ...state, [key]: value })),
}));
