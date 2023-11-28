import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L, { type MarkerCluster } from "leaflet";
import LoadingSpinner from "../ui/loading-spinner";
import { api } from "../../lib/utils/api";
import SpotMarker from "./SpotMarker";
import { useRouter } from "next/router";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "react-leaflet-cluster";

const createClusterCustomIcon = (cluster: MarkerCluster) => {
  return L.divIcon({
    html: `<span>${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: L.point(33, 33, true),
  });
};

const FishingSpotsMap = () => {
  const fisheries = api.fishery.getFisheries.useQuery();

  return (
    <MapContainer preferCanvas={true} center={[52.09, 19.09]} zoom={7}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {fisheries.isLoading && (
        <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center ">
          <div className="relative">
            <LoadingSpinner />
          </div>
          <p className="text-dark mt-8 rounded-md  bg-white/40 p-2 text-xl font-bold text-primary-dark dark:bg-primary-dark dark:text-primary">
            Wczytuje punkty...
          </p>
        </div>
      )}
      <FlyToHandler />
      <MarkerClusterGroup
        onClick={(e) => console.log("onClick", e)}
        iconCreateFunction={createClusterCustomIcon}
        maxClusterRadius={150}
        showCoverageOnHover={false}
        polygonOptions={{
          opacity: 0,
        }}
      >
        {fisheries.data &&
          fisheries.data.map((fishingSpot) => (
            <SpotMarker key={fishingSpot.id} fishingSpot={fishingSpot} />
          ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default FishingSpotsMap;

// USES query param flyTo=lat,lng to center point
const FlyToHandler = () => {
  const map = useMap();
  const router = useRouter();
  useEffect(() => {
    const positionParams = router.query.flyTo as string;
    if (positionParams) {
      const [lat, lng] = positionParams.split(",");
      if (lat && lng) {
        map.flyTo({ lat: parseFloat(lat), lng: parseFloat(lng) }, 14);
      }
    }
  }, [router.query, map]);
  return null;
};
