import React from "react";
import dynamic from "next/dynamic";
import FishingSpotSidebar from "../components/fishing-spot-sidebar/FishingSpotSidebar";

const MapPage = () => {
  const FishingSpotsMap = dynamic(
    () => import("../components/map/FishingSpotsMap"),
    { ssr: false }
  );
  return (
    <div className="h-calc-screen w-full">
      <FishingSpotSidebar />
      <FishingSpotsMap />
    </div>
  );
};

export default MapPage;
