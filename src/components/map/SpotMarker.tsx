import React, { useRef } from "react";
React.useLayoutEffect = React.useEffect;
import { Marker, Popup } from "react-leaflet";
import { type FishingSpot } from "@prisma/client";
import Link from "next/link";
import L from "leaflet";

const SpotMarker = ({
  fishingSpot,
}: {
  fishingSpot: Pick<FishingSpot, "lat" | "lng" | "id" | "name">;
}) => {
  const markerRef = useRef<L.Marker>(null);
  const placeIcon = L.icon({
    iconUrl: "/pin.svg",
    iconSize: [44, 44],
  });

  return (
    <Marker
      icon={placeIcon}
      ref={markerRef}
      position={{ lat: fishingSpot.lat, lng: fishingSpot.lng }}
    >
      <Popup>
        <div className="relative flex h-[140px] w-[180px] flex-col overflow-hidden rounded-md">
          <h4 className="p-1 text-center text-lg">{fishingSpot.name}</h4>
          <Link
            className="text-dark mt-auto block bg-accent py-2 text-center text-lg font-bold "
            href={`/fishing-spot/${fishingSpot.id}`}
          >
            Szczegóły
          </Link>
        </div>
      </Popup>
    </Marker>
  );
};

export default SpotMarker;
