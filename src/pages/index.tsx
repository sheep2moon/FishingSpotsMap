import Image from "next/image";
import React, { Fragment } from "react";
import heroImgSrc from "../assets/hero-bg.jpg";
import { api } from "../utils/api";
import Link from "next/link";
import { Tab } from "@headlessui/react";
import clsx from "clsx";
import { getSpotImageSrc } from "../utils/getImageSrc";

const Home = () => {
  const fishingSpotsCountQuery = api.fishery.getFishingSpotsCount.useQuery();
  const recentFishingSpotsQuery = api.fishery.getRecentFishingSpots.useQuery();
  return (
    <div className="-mt-16 flex w-full flex-col items-center justify-center text-black">
      <div className="relative h-screen max-h-[700px] w-full ">
        <Image className="object-cover" alt="" src={heroImgSrc} fill />
        <div className="z-99 absolute left-0 right-0 top-0 h-32 bg-gradient-to-b from-black to-black/0"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-light">
          <h3 className="text-6xl font-black drop-shadow-[0_1.8px_1.8px_rgba(0,0,0,0.9)]">
            {fishingSpotsCountQuery.data}
          </h3>
          <h1 className="text-6xl font-black drop-shadow-[0_1.8px_1.8px_rgba(0,0,0,0.9)] ">
            ŁOWISK
          </h1>
          {/* <h3 className="text-xl font-black uppercase drop-shadow-[0_1.8px_1.8px_rgba(0,0,0,0.9)]">
            czeka na ciebie
          </h3> */}
          <Link
            href="/fishing-spots-map"
            className="mt-6 rounded-md bg-black/30 p-2 text-2xl font-bold drop-shadow-[0_1.8px_1.8px_rgba(0,0,0,0.9)] transition-all hover:bg-black"
          >
            PRZEJDŹ DO MAPY
          </Link>
        </div>
      </div>
      <div>
        <Tab.Group>
          <Tab.List className="flex items-center gap-2 p-1 text-light">
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={clsx("rounded-sm  p-2 px-2 text-lg", {
                    "bg-light/30": !!selected,
                    "bg-light/10": !selected,
                  })}
                >
                  Ostatnio dodane
                </button>
              )}
            </Tab>

            <Tab>
              {({ selected }) => (
                <button
                  className={clsx("rounded-sm  p-2 px-2 text-lg", {
                    "bg-light/30": !!selected,
                    "bg-light/10": !selected,
                  })}
                >
                  Najnowsze
                </button>
              )}
            </Tab>
            <Tab>
              {({ selected }) => (
                <button
                  className={clsx("rounded-sm  p-2 px-2 text-lg", {
                    "bg-light/30": !!selected,
                    "bg-light/10": !selected,
                  })}
                >
                  S
                </button>
              )}
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel className="grid grid-cols-4 text-light">
              {recentFishingSpotsQuery.data &&
                recentFishingSpotsQuery.data.map((spot) => (
                  <div key={`recent-${spot.id}`}>
                    <div className="relative aspect-video w-28">
                      <Image
                        src={getSpotImageSrc(spot.imagesId[0] || "")}
                        alt="podgląd łowiska"
                        fill
                      />
                    </div>
                    <h4>{spot.name}</h4>
                  </div>
                ))}
            </Tab.Panel>
            <Tab.Panel>Content 2</Tab.Panel>
            <Tab.Panel>Content 3</Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default Home;
