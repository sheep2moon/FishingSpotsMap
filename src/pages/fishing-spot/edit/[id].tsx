import type { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import React, { useState } from "react";
import { authOptions } from "../../../server/auth";
import { useRouter } from "next/router";
import { api } from "../../../utils/api";
import LoadingSpinner from "../../../components/common/LoadingSpinner";
import { IconFileDescription, IconMessagePin } from "@tabler/icons-react";
import clsx from "clsx";

type EditableTab = { name: string; icon: React.ReactNode; id: string };
const editableTabs: EditableTab[] = [
  {
    name: "Podstawowe",
    id: "general",
    icon: <IconMessagePin />,
  },
  {
    name: "Opis",
    id: "description",
    icon: <IconFileDescription />,
  },
];

const EditFishingSpot = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const [selectedTabId, setSelectedTabId] = useState<string>(
    editableTabs[0] ? editableTabs[0].id : ""
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
                "flex items-center gap-2 rounded-sm p-2 text-lg dark:bg-primary-800",
                { "dark:bg-primary-700": selectedTabId === editableTab.id }
              )}
              key={editableTab.id}
              onClick={() => handleSelectTab(editableTab)}
            >
              {editableTab.icon}
              <span>{editableTab.name}</span>
            </div>
          ))}
        </div>
        <div className="col-span-3 px-4 py-2">{spotQuery.data?.name}</div>
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
