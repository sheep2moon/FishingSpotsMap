import React, { useRef } from "react";
import { Marker, useMapEvent } from "react-leaflet";
import { searchReverse } from "../../utils/searchReverse";

type MapPinProps = {
  position: Position | null;
  setPosition: (p: Position) => void;
  disabled?: boolean;
};

const MapPin = ({ position, setPosition, disabled = false }: MapPinProps) => {
  const markerRef = useRef(null);

  const markerEventHandlers = {
    click: () => {
      console.log("click");
    },
  };

  useMapEvent("click", async (e) => {
    if (!disabled) {
      const position: Position = e.latlng;
      setPosition(position);
      await searchReverse(position);
    }
  });

  if (!position) return <></>;
  return (
    <Marker
      ref={markerRef}
      position={[position.lat, position.lng]}
      eventHandlers={markerEventHandlers}
    />
  );
};

export default MapPin;
