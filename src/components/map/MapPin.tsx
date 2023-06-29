import React, { useRef } from "react";
import { Marker, useMapEvent } from "react-leaflet";
import { searchReverse } from "../../utils/searchReverse";

type MapPinProps = {
  position: Position | null;
  onPositionChange: (p: Position) => Promise<void>;
  disabled?: boolean;
};

const MapPin = ({
  position,
  onPositionChange,
  disabled = false,
}: MapPinProps) => {
  const markerRef = useRef(null);

  const markerEventHandlers = {
    click: () => {
      console.log("click");
    },
  };

  useMapEvent("click", async (e) => {
    if (!disabled) {
      const position: Position = e.latlng;
      await onPositionChange(position);
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
