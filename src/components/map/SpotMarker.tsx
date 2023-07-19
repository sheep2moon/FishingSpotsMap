import L from "leaflet";
import React, { useRef } from "react";
React.useLayoutEffect = React.useEffect;
import { CircleMarker, Marker, Popup } from "react-leaflet";
import { type FishingSpot } from "@prisma/client";
import Button from "../common/Button";

const SpotMarker = ({
  fishingSpot,
  handleDisplayDetails,
}: {
  fishingSpot: Pick<FishingSpot, "lat" | "lng" | "id" | "name">;
  handleDisplayDetails: (id: string) => void;
}) => {
  const markerRef = useRef<L.CircleMarker>(null);
  // const placeIcon = L.icon({
  //   iconUrl: "/pin.svg",
  //   iconSize: [22, 22],
  // });

  return (
    <CircleMarker
      // icon={placeIcon}
      ref={markerRef}
      radius={4}
      center={{ lat: fishingSpot.lat, lng: fishingSpot.lng }}
      // position={{ lat: fishingSpot.lat, lng: fishingSpot.lng }}
    >
      <Popup>
        <div className="relative flex h-[140px] w-[180px] flex-col overflow-hidden rounded-md">
          <h4>{fishingSpot.name}</h4>
          <Button
            onClick={() => handleDisplayDetails(fishingSpot.id)}
            className="mt-auto"
          >
            Szczegóły
          </Button>
        </div>
      </Popup>
    </CircleMarker>
  );
};

export default SpotMarker;
