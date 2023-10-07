import React from "react";
import dynamic from "next/dynamic";

const FishingSpotsMap = dynamic(
  () => import("../components/map/FishingSpotsMap"),
  { ssr: false }
);
const MapPage = () => {
  return (
    <div className="z-10 flex h-screen w-full">
      <FishingSpotsMap />
    </div>
  );
};

export default MapPage;
