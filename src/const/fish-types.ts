export const fishTypes = [
  "Karp",
  "Amur",
  "Sandacz",
  "Szczupak",
  "Tołpyga",
  "Sum",
  "Okoń",
  "Wzdręga",
  "Leszcz",
  "Karaś",
  "Węgorz",
  "Lin",
  "Płoć",
] as const;

export type FishType = (typeof fishTypes)[number];
