import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import MapPin from "./MapPin";
import { searchCityByLatLng } from "../../lib/utils/searchReverse";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { IconCurrentLocation } from "@tabler/icons-react";

type SelectPositionMapProps = {
  disabled?: boolean;
  position: Position;
  setPosition: (position: Position) => void;
  setCity?: (city: string) => void;
  setProvince?: (province: string) => void;
};

const SelectPositionMap = ({
  disabled,
  setPosition,
  setCity,
  setProvince,
  position,
}: SelectPositionMapProps) => {
  const onPositionChange = async (position: Position) => {
    setPosition(position);

    if (setCity || setProvince) {
      const { province, city } = await searchCityByLatLng(position);
      setCity?.(city);
      setProvince?.(province);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IconCurrentLocation size="2rem" />
            Lokalizacja łowiska
          </CardTitle>
          <CardDescription>Wskaż lokalizacje łowiska na mapie</CardDescription>
        </CardHeader>
        <CardContent className="relative aspect-square w-full sm:aspect-video">
          <MapContainer
            scrollWheelZoom={!disabled}
            center={
              position.lat !== 0 && position.lng !== 0
                ? [position.lat, position.lng]
                : [52.09, 19.09]
            }
            zoom={position.lat !== 0 && position.lng !== 0 ? 13 : 6}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapPin
              disabled={false}
              position={position}
              onPositionChange={onPositionChange}
            />
          </MapContainer>
        </CardContent>
      </Card>
    </>
  );
};

export default SelectPositionMap;
