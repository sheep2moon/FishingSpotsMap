import { type fishTypes } from "../const/fish-types";

export type Position = {
  lat: number;
  lng: number;
};
export type FishTypes = (typeof fishTypes)[];
export type SpotPricing = { title: string; value: string }[];
