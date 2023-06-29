import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import MapPin from "./MapPin";
import { useNewSpotStore } from "../../zustand/new-spot-store";

type PositionMapProps = {
  //   position: Position | null;
  //   setPosition: (p: Position) => void;
  disabled?: boolean;
};

const PositionMap = ({ disabled }: PositionMapProps) => {
  const { position, setPosition } = useNewSpotStore((store) => store);
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
          setPosition={setPosition}
        />
      </MapContainer>
    </div>
  );
};

export default PositionMap;
