import React from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import LoadingSpinner from "../common/LoadingSpinner";

const FishingSpotsMap = () => {
  const isLoading = false;

  return (
    <MapContainer center={[52.09, 19.09]} zoom={6}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* {isLoading && (
        <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center ">
          <div className="relative">
            <LoadingSpinner />
          </div>
          <p className="text-dark mt-8 rounded-md  bg-white/40 text-xl font-bold">
            Wczytuje punkty...
          </p>
        </div>
      )} */}
    </MapContainer>
  );
};

export default FishingSpotsMap;
