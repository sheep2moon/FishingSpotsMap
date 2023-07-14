import clsx from "clsx";
import React, { useEffect, useState } from "react";
import useSpotSidebarStore from "../../zustand/spot-sidebar-store";
import { api } from "../../utils/api";
import { IconCaretLeft, IconCaretRight } from "@tabler/icons-react";

const FishingSpotSidebar = () => {
  const { spotId, isOpen, toggleIsOpen } = useSpotSidebarStore(
    (store) => store
  );
  const fishingSpotQuery = api.fishery.getFishingSpot.useQuery(
    { id: spotId },
    { enabled: !!spotId }
  );

  //   useEffect(() => {
  //     void fishingSpotQuery.refetch();

  //   }, [spotId]);

  return (
    <aside
      id="default-sidebar"
      className={clsx(
        "fixed right-0 top-16 z-[999] h-screen w-96 bg-gray-800 transition-transform",
        { "translate-x-0": isOpen, "translate-x-full": !isOpen }
      )}
      aria-label="Sidebar"
    >
      {fishingSpotQuery.data && (
        <button
          className="absolute top-1/2 w-fit -translate-x-full -translate-y-16 rounded-l-md border-2 border-r-0 border-dark bg-accent p-2 py-4"
          onClick={toggleIsOpen}
        >
          {isOpen ? <IconCaretRight /> : <IconCaretLeft />}
        </button>
      )}
      <div className="dark: h-full overflow-y-auto px-3">
        {fishingSpotQuery.data && <div>{fishingSpotQuery.data.name}</div>}
      </div>
    </aside>
  );
};

export default FishingSpotSidebar;
