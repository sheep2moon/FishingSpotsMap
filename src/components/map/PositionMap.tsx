import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import MapPin from "./MapPin";
import { useNewSpotStore } from "../../zustand/new-spot-store";
import { searchReverse } from "../../utils/searchReverse";

type PositionMapProps = {
  //   position: Position | null;
  //   setPosition: (p: Position) => void;
  disabled?: boolean;
  setCity: (c: string) => void;
  setProvince: (p: string) => void;
};

const PositionMap = ({ disabled, setCity, setProvince }: PositionMapProps) => {
  const { position, setField } = useNewSpotStore((store) => store);

  const onPositionChange = async (position: Position) => {
    setField("position", position);
    const { province, city } = await searchReverse(position);
    setCity(city);
    let formattedProvince = province.split(" ")[1];
    if (formattedProvince) {
      formattedProvince =
        formattedProvince.charAt(0).toUpperCase() + formattedProvince.slice(1);
      setProvince(formattedProvince);
    }
  };

  return (
    <div className="small:aspect relative aspect-square w-full">
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
          disabled={disabled}
          position={position}
          onPositionChange={onPositionChange}
        />
      </MapContainer>
    </div>
  );
};

export default PositionMap;
