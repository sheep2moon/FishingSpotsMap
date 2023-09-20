import { type fishTypeNames } from "../const/fish-type-names";

export type Position = {
  lat: number;
  lng: number;
};
export type FishType = (typeof fishTypeNames)[number];
export type SpotPricing = { title: string; value: string }[];
