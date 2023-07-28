import Image from "next/image";
import React, { Fragment } from "react";
import heroImgSrc from "../assets/hero-bg.jpg";
import { api } from "../utils/api";
import Link from "next/link";
import { Tab } from "@headlessui/react";
import clsx from "clsx";
import { getSpotImageSrc } from "../utils/getImageSrc";
import { IconClock, IconFishHook, IconMoonFilled } from "@tabler/icons-react";
import { IconTent } from "@tabler/icons-react";
import { IconBoxPadding } from "@tabler/icons-react";

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
      <div className="mt-8 w-full max-w-screen-xl px-2">
        <h2 className="flex gap-2 p-2 text-xl font-semibold ">
          <IconClock className="text-accent" />
          Ostatnio dodane łowiska
        </h2>
        <div className="">
          <div className="grid grid-cols-4 gap-2">
            {recentFishingSpotsQuery.data &&
              recentFishingSpotsQuery.data.map((spot) => (
                <Link
                  href={`/fishing-spot/${spot.id}`}
                  key={`recent-${spot.id}`}
                  className="flex cursor-pointer flex-col justify-start rounded-md bg-accent/20 transition-all hover:scale-[101%] hover:bg-accent/10 hover:outline hover:outline-2 hover:outline-accent/40 hover:transition-all"
                >
                  <div className="relative aspect-video w-full">
                    <Image
                      className="rounded-md"
                      src={getSpotImageSrc(spot.imagesId[0] || "")}
                      alt="podgląd łowiska"
                      fill
                    />
                  </div>

                  <div className="px-2">
                    <h4 className="overflow-ellipsis whitespace-nowrap text-base font-bold">
                      {spot.name}
                    </h4>
                    <p className="-mt-2 whitespace-nowrap text-xs text-dark/90">{`${spot.city}, woj. ${spot.province}`}</p>
                  </div>
                  <div className="mb-1 mt-2 grid grid-cols-2 gap-1 divide-x-2 px-1">
                    <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center">
                        <IconBoxPadding className="text-accent" />
                        <p className="text-center">powierzchnia</p>
                      </div>
                      <span className="text-sm font-semibold">
                        {parseFloat(spot.area)}ha
                      </span>
                    </div>
                    <div className="grid place-items-center">
                      <div className="flex items-center">
                        <IconFishHook className="text-accent" />
                        <p>spinning</p>
                      </div>
                      <span className="text-sm font-semibold">
                        {spot.spinning ? "TAK" : "NIE"}
                      </span>
                    </div>
                    {/* <div className="grid place-items-center">
                        <IconTent className="text-accent" />
                        <span>{spot.tent ? "TAK" : "NIE"}</span>
                      </div> */}
                  </div>
                </Link>
              ))}
          </div>
        </div>

        {/* <Tab.List className="mt-4 grid grid-cols-3 gap-2 p-1">
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={clsx(
                    "flex items-center justify-center gap-2 rounded-sm rounded-t-lg border-accent bg-light/5 p-2 px-2 text-lg",
                    {
                      "border-b-2 text-accent": !!selected,
                      "border-b-0 ": !selected,
                    }
                  )}
                >
                  <IconClock />
                  Ostatnio dodane
                </button>
              )}
            </Tab>

            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={clsx(
                    "rounded-sm rounded-t-lg border-accent bg-light/5  p-2 px-2 text-lg",
                    {
                      "border-b-2 text-accent": !!selected,
                      "border-b-0 ": !selected,
                    }
                  )}
                >
                  Najnowsze
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={clsx(
                    "rounded-sm rounded-t-lg border-accent bg-light/5 p-2 px-2 text-lg",
                    {
                      "border-b-2 text-accent": !!selected,
                      "border-b-0": !selected,
                    }
                  )}
                >
                  S
                </button>
              )}
            </Tab>
          </Tab.List> */}
      </div>
    </div>
  );
};

export default Home;
