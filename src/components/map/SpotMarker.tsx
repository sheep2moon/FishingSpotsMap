import L from "leaflet";
import React, { useRef } from "react";
React.useLayoutEffect = React.useEffect;
import { Marker, Popup } from "react-leaflet";
import { type FishingSpot } from "@prisma/client";
import Button from "../common/Button";
import { useRouter } from "next/router";
import useSpotSidebarStore from "../../zustand/spot-sidebar-store";

const SpotMarker = ({ fishingSpot }: { fishingSpot: FishingSpot }) => {
  const markerRef = useRef<L.Marker>(null);
  const { setSpotId } = useSpotSidebarStore((store) => store);
  const router = useRouter();
  const placeIcon = L.icon({
    iconUrl: "/pin.svg",
    iconSize: [22, 22],
  });

  const handleDisplayDetails = () => {
    const newQuery = new URLSearchParams({
      ...router.query,
      spotId: fishingSpot.id,
    }).toString();
    const newUrl = `${router.pathname}?${newQuery}`;
    window.history.replaceState(
      { ...window.history.state, as: newUrl, url: newUrl },
      "",
      newUrl
    );
    setSpotId(fishingSpot.id);
    // void router.push(newUrl, undefined, { shallow: true });
  };

  return (
    <Marker
      icon={placeIcon}
      ref={markerRef}
      position={{ lat: fishingSpot.lat, lng: fishingSpot.lng }}
    >
      <Popup>
        <div className="relative flex h-[140px] w-[180px] flex-col overflow-hidden rounded-md">
          <Button onClick={handleDisplayDetails} className="mt-auto">
            Szczegóły
          </Button>
        </div>
      </Popup>
    </Marker>
  );
};

export default SpotMarker;
