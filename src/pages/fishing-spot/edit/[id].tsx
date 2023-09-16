import type { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import React, { useState } from "react";
import { authOptions } from "../../../server/auth";
import { useRouter } from "next/router";
import { api } from "../../../lib/utils/api";
import LoadingSpinner from "../../../components/common/LoadingSpinner";
import {
  IconAdjustmentsHorizontal,
  IconFileDescription,
  IconFish,
  IconMessagePin,
  IconPhotoEdit,
} from "@tabler/icons-react";
import clsx from "clsx";
import { IconGps } from "@tabler/icons-react";
import EditTabContainer from "../../../components/edit-spot/EditTabContainer";

type EditableTab = { name: string; icon: React.ReactNode; id: string };
const editableTabs: EditableTab[] = [
  {
    name: "Podstawowe",
    id: "general",
    icon: <IconMessagePin />,
  },
  {
    name: "Lokalizacja",
    id: "position",
    icon: <IconGps />,
  },
  {
    name: "Zdjęcia",
    id: "images",
    icon: <IconPhotoEdit />,
  },
  {
    name: "Występujące ryby",
    id: "fish_types",
    icon: <IconFish />,
  },
  {
    name: "Szczegóły",
    id: "details",
    icon: <IconAdjustmentsHorizontal />,
  },
  {
    name: "Opis",
    id: "description",
    icon: <IconFileDescription />,
  },
];

// type EditTabId = (typeof editableTabs)[number]["id"];
type EditTabId = Extract<EditableTab["id"], string>;

const EditFishingSpot = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const [selectedTabId, setSelectedTabId] = useState<EditTabId>(
    editableTabs[0]?.id as EditTabId
  );
  const spotQuery = api.fishery.getFishingSpot.useQuery({ id });
  const handleSelectTab = (tab: EditableTab) => {
    setSelectedTabId(tab.id);
  };

  if (spotQuery.isLoading)
    return (
      <div className="mx-auto grid h-screen w-full max-w-screen-xl place-items-center pt-16">
        <div className="relative aspect-square w-32"></div>
        <LoadingSpinner />
      </div>
    );
  return (
    <div className="mx-auto mt-16 w-full max-w-screen-xl">
      <div className="grid w-full grid-cols-4 p-2">
        <div className="col-span-1 flex flex-col">
          {editableTabs.map((editableTab) => (
            <div
              className={clsx(
                "dark:bg-primary-800 flex items-center gap-2 rounded-sm p-3 text-lg",
                { "dark:bg-primary-700": selectedTabId === editableTab.id }
              )}
              key={editableTab.id}
              onClick={() => handleSelectTab(editableTab)}
            >
              <span className="text-secondary-300">{editableTab.icon}</span>
              <span>{editableTab.name}</span>
            </div>
          ))}
        </div>
        <div className="col-span-3 px-4 py-2">
          <EditTabContainer>{selectedTabId === ""}</EditTabContainer>
        </div>
      </div>
    </div>
  );
};

export default EditFishingSpot;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  console.log(session);

  if (!session || session.user.role !== "MODERATOR") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
