import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import LoadingSpinner from "../common/LoadingSpinner";
import { api } from "../../utils/api";
import SpotMarker from "./SpotMarker";
import { useRouter } from "next/router";
import useSpotSidebarStore from "../../zustand/spot-sidebar-store";

const FishingSpotsMap = () => {
  const isLoading = false;
  const fisheries = api.fishery.getFisheries.useQuery();
  const { setSpotId } = useSpotSidebarStore((store) => store);
  const router = useRouter();

  const handleDisplayDetails = (spotId: string) => {
    const newQuery = new URLSearchParams({
      ...router.query,
      spotId,
    }).toString();
    const newUrl = `${router.pathname}?${newQuery}`;
    window.history.replaceState(
      { ...window.history.state, as: newUrl, url: newUrl },
      "",
      newUrl
    );
    setSpotId(spotId);
    // void router.push(newUrl, undefined, { shallow: true });
  };

  return (
    <MapContainer preferCanvas={true} center={[52.09, 19.09]} zoom={6}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {fisheries.isLoading && (
        <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center ">
          <div className="relative">
            <LoadingSpinner />
          </div>
          <p className="mt-8 rounded-md bg-white/40  text-xl font-bold text-dark">
            Wczytuje punkty...
          </p>
        </div>
      )}
      {fisheries.data &&
        fisheries.data.map((fishingSpot) => (
          <SpotMarker
            handleDisplayDetails={handleDisplayDetails}
            key={fishingSpot.id}
            fishingSpot={fishingSpot}
          />
        ))}
    </MapContainer>
  );
};

export default FishingSpotsMap;
