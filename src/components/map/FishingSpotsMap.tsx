import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import L, { MarkerCluster } from "leaflet";
import LoadingSpinner from "../common/LoadingSpinner";
import { api } from "../../utils/api";
import SpotMarker from "./SpotMarker";
import { useRouter } from "next/router";
import useSpotSidebarStore from "../../zustand/spot-sidebar-store";
import markerSvg from "../../assets/map-icon.svg";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet/dist/leaflet.css";

const customIcon: L.Icon = new L.Icon({
  iconUrl: "/pin.svg",
  iconSize: [40, 40],
});

const createClusterCustomIcon = (cluster: MarkerCluster) => {
  return L.divIcon({
    html: `<span>${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: L.point(33, 33, true),
  });
};
// const customIcon = L.Icon.extend({
//   options: {
//     iconUrl: "/pin.svg",
//     iconSize: [40, 40],
//   },

const FishingSpotsMap = () => {
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
          <p className="mt-8 rounded-md bg-white/40  text-xl font-bold text-dark">
            Wczytuje punkty...
          </p>
        </div>
      )}
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
            <SpotMarker
              handleDisplayDetails={handleDisplayDetails}
              key={fishingSpot.id}
              fishingSpot={fishingSpot}
            />
          ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default FishingSpotsMap;
