import React from "react";
import dynamic from "next/dynamic";
import Script from "next/script";
import Head from "next/head";

const MapPage = () => {
  const FishingSpotsMap = dynamic(
    () => import("../components/map/FishingSpotsMap"),
    { ssr: false }
  );
  return (
    <>
      <div className="mt-auto h-16 w-full bg-black"></div>
      <FishingSpotsMap />
    </>
  );
};

export default MapPage;
