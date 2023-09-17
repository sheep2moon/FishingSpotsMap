import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import MapPin from "../map/MapPin";
import { useNewSpotStore } from "../../zustand/new-spot-store";
import { searchReverse } from "../../lib/utils/searchReverse";
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
};

const SelectPositionMap = ({ disabled }: SelectPositionMapProps) => {
  const { position, setField } = useNewSpotStore((store) => store);

  const onPositionChange = async (position: Position) => {
    setField("position", position);
    const { province, city } = await searchReverse(position);
    setField("city", city);
    let formattedProvince = province.split(" ")[1];
    if (formattedProvince) {
      formattedProvince =
        formattedProvince.charAt(0).toUpperCase() + formattedProvince.slice(1);
      setField("province", formattedProvince);
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
            center={position ? [position.lat, position.lng] : [52.09, 19.09]}
            zoom={position ? 13 : 6}
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
