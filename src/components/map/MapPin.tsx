import React, { useRef } from "react";
import { Marker, useMapEvent } from "react-leaflet";
import { searchReverse } from "../../lib/utils/searchReverse";

type MapPinProps =
  | {
      disabled: false;
      position: Position | null;
      onPositionChange: (p: Position) => Promise<void>;
    }
  | {
      disabled: true;
      position: Position | null;
    };

const MapPin = (props: MapPinProps) => {
  const markerRef = useRef(null);

  useMapEvent("click", async (e) => {
    if (!props.disabled) {
      const position: Position = e.latlng;
      await props.onPositionChange(position);
    }
  });

  if (!props.position) return <></>;
  return (
    <Marker
      ref={markerRef}
      position={[props.position.lat, props.position.lng]}
    />
  );
};

export default MapPin;
