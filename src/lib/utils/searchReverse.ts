/* eslint-disable @typescript-eslint/no-unsafe-member-access */
type Response = {
  [key: string]: any;
};
export const searchCityByLatLng = async (position: Position) => {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${position.lat}&lon=${position.lng}&format=json`;
  const res = await fetch(url);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const result: Response = await res.json();
  console.log(result);
  let province = "";
  const city =
    (result.address.city as string) ||
    (result.address.village as string) ||
    (result.address.town as string) ||
    "";
  if (!result) return { province, city };
  if (result.address.state) {
    const state = result.address.state as string;
    province =
      state?.split(" ")[1]?.replace(/^\w/, (c) => c.toUpperCase()) || "";
  }

  return { province, city };
};
