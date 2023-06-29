/* eslint-disable @typescript-eslint/no-unsafe-member-access */
type Response = {
  [key: string]: any;
};
export const searchReverse = async (position: Position) => {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${position.lat}&lon=${position.lng}&format=json`;
  const res = await fetch(url);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const result: Response = await res.json();
  console.log(result);
  let province = "";
  let city = "";
  if (result?.address) {
    if (result.address.state) province = result.address.state as string;
    if (result.address.city) city = result.address.city as string;
    else if (result.address.village) city = result.address.city as string;
  }
  return { province, city };
};
