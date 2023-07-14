import React from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import LoadingSpinner from "../common/LoadingSpinner";
import { api } from "../../utils/api";
import SpotMarker from "./SpotMarker";

const FishingSpotsMap = () => {
  const isLoading = false;
  const fisheries = api.fishery.getFisheries.useQuery();
  return (
    <MapContainer center={[52.09, 19.09]} zoom={6}>
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
          <SpotMarker key={fishingSpot.id} fishingSpot={fishingSpot} />
        ))}
    </MapContainer>
  );
};

export default FishingSpotsMap;
