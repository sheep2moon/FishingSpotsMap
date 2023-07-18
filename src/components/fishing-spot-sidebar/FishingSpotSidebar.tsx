import clsx from "clsx";
import React, { useEffect } from "react";
import useSpotSidebarStore from "../../zustand/spot-sidebar-store";
import { RouterOutputs, api } from "../../utils/api";
import { IconCaretRight, IconMapPinPin } from "@tabler/icons-react";
import Image from "next/image";
import { getSpotImageSrc } from "../../utils/getImageSrc";
import { FishingSpot } from "@prisma/client";
import { inferProcedureOutput } from "@trpc/server";
import LoadingSpinner from "../common/LoadingSpinner";

const FishingSpotSidebar = () => {
  const { spotId, isOpen, toggleIsOpen } = useSpotSidebarStore(
    (store) => store
  );
  const fishingSpotQuery = api.fishery.getFishingSpot.useQuery(
    { id: spotId },
    { enabled: !!spotId }
  );

  useEffect(() => {
    console.log(fishingSpotQuery.data);
  }, [fishingSpotQuery.data]);

  return (
    <aside
      id="default-sidebar"
      className={clsx(
        "fixed right-0 top-16 z-[999] h-screen w-[800px] bg-gray-800 transition-transform",
        { "translate-x-0": isOpen, "translate-x-full": !isOpen }
      )}
      aria-label="Sidebar"
    >
      {fishingSpotQuery.data && (
        <button
          className="absolute top-1/2 w-fit -translate-x-full -translate-y-16 rounded-l-md border-2 border-r-0 border-dark bg-accent p-2 py-4"
          onClick={toggleIsOpen}
        >
          <IconCaretRight
            className={clsx("", {
              "rotate-0": isOpen,
              "rotate-180": !isOpen,
            })}
          />
        </button>
      )}
      <div className="dark: h-full overflow-y-auto border-l-2 border-primary bg-light text-dark">
        {fishingSpotQuery.data && (
          <SidebarContent fishingSpot={fishingSpotQuery.data} />
        )}
      </div>
    </aside>
  );
};

export default FishingSpotSidebar;

const SidebarContent = ({
  fishingSpot,
}: {
  fishingSpot: RouterOutputs["fishery"]["getFishingSpot"];
}) => {
  if (!fishingSpot) return <LoadingSpinner />;

  return (
    <div className=" ">
      <div className="relative h-96 w-full">
        {fishingSpot.imagesId[0] && (
          <Image
            fill
            alt="widok łowiska"
            src={getSpotImageSrc(fishingSpot.imagesId[0])}
          />
        )}
      </div>
      <div className="relative -top-3 flex flex-col items-center justify-center divide-x-2 rounded-t-2xl bg-light px-2 pb-2 pt-4 leading-3">
        <h2 className="text-xl font-bold">{fishingSpot.name}</h2>
        <span className="flex items-center gap-2 text-dark/60">
          <IconMapPinPin className="" />
          {fishingSpot.city}
          {", woj. "}
          {fishingSpot.province}
        </span>
      </div>
      <div className="px-3 pr-6">
        <h5 className="mt-4 font-bold uppercase text-dark/60">
          Występujące typy ryb
        </h5>
        <div className="flex gap-1">
          {fishingSpot.fish_types.map((fishType) => (
            <div
              className="rounded-sm border border-gray-600/20 bg-primary/10 p-2 shadow shadow-primary/20"
              key={fishType}
            >
              {fishType}
            </div>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-4 gap-2 divide-x-2 ">
          <div className="flex flex-col items-center justify-center gap-3 rounded-sm  py-1">
            <span>Nocleg</span>
            <span className="font-bold">
              {fishingSpot.accommodation ? "TAK" : "NIE"}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center gap-3 rounded-sm   py-1">
            <span>Spinning</span>
            <span className="font-bold">
              {fishingSpot.spinning ? "TAK" : "NIE"}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center gap-3 rounded-sm   py-2">
            <span className="text-center">Możliwość rozłożenia namiotu</span>
            <span className="font-bold">
              {fishingSpot.tent ? "TAK" : "NIE"}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center gap-3 rounded-sm   py-1">
            <span className="text-center">Łowienie w nocy</span>
            <span className="font-bold">
              {fishingSpot.night_fishing ? "TAK" : "NIE"}
            </span>
          </div>
        </div>

        <h5 className="mt-4 font-bold uppercase text-dark/60">Opis</h5>
        <pre className="font-montserrat whitespace-pre-wrap leading-5 ">
          {fishingSpot.description}
        </pre>
      </div>
    </div>
  );
};
