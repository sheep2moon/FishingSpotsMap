import type { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import React, { useEffect, useRef, useState } from "react";
import { authOptions } from "../../../server/auth";
import { useRouter } from "next/router";
import { api } from "../../../lib/utils/api";
import LoadingSpinner from "../../../components/ui/loading-spinner";
import {
  IconAdjustmentsHorizontal,
  IconFileDescription,
  IconFish,
  IconMessagePin,
  IconPhotoEdit,
} from "@tabler/icons-react";
import clsx from "clsx";
import { IconGps } from "@tabler/icons-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

import { Button } from "../../../components/ui/button";
import { cn } from "../../../lib/utils/cn";
import {
  ViewHeader,
  ViewSubtitle,
  ViewTitle,
} from "../../../components/ui/view-header";
import { BasicsSpotForm } from "../../../components/fishing-spot-forms/basics-spot-form";
import { useEditSpotStore } from "../../../zustand/edit-spot-store";
import { DetailsSpotForm } from "../../../components/fishing-spot-forms/details-spot-form";
import { DescriptionSpotForm } from "../../../components/fishing-spot-forms/description-spot-form";
import dynamic from "next/dynamic";
import { FishTypeSpotForm } from "../../../components/fishing-spot-forms/fish-types-spot-form";
import PricingSpotForm from "../../../components/fishing-spot-forms/pricing-spot-form";
import { IconTag } from "@tabler/icons-react";

const SelectPositionMap = dynamic(
  () => import("../../../components/map/SelectPositionMap"),
  {
    ssr: false,
  }
);
// type EditableTab = { name: string; icon: React.ReactNode; id: string };
const editableTabs = [
  {
    name: "Podstawowe",
    id: "basics",
    icon: <IconMessagePin />,
  },
  {
    name: "Szczegóły",
    id: "details",
    icon: <IconAdjustmentsHorizontal />,
  },
  {
    name: "Lokalizacja",
    id: "position",
    icon: <IconGps />,
  },
  {
    name: "Opis",
    id: "description",
    icon: <IconFileDescription />,
  },
  {
    name: "Cennik",
    id: "prices",
    icon: <IconTag />,
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
] as const;

type EditableTab = (typeof editableTabs)[number];
// type EditTabId = key;

const EditFishingSpot = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const spotQuery = api.fishery.getFishingSpot.useQuery({ id }, {});
  const editableArea = useRef<HTMLDivElement>(null);
  const [selectedTab, setSelectedTab] = useState<EditableTab>(editableTabs[0]);
  const {
    lat,
    lng,
    prices,
    fish_types,
    area,
    tent,
    description,
    spinning,
    accommodation,
    night_fishing,
    city,
    name,
    province,
    setField,
    setEditableFields,
  } = useEditSpotStore((store) => store);

  useEffect(() => {
    if (spotQuery.isSuccess && spotQuery.data)
      setEditableFields({
        accommodation: spotQuery.data.accommodation,
        area: spotQuery.data.area,
        name: spotQuery.data.name,
        city: spotQuery.data.city,
        description: spotQuery.data.description,
        fish_types: spotQuery.data.fish_types,
        lat: spotQuery.data.lat,
        lng: spotQuery.data.lng,
        night_fishing: spotQuery.data.night_fishing,
        prices: spotQuery.data.prices,
        province: spotQuery.data.province,
        spinning: spotQuery.data.spinning,
        tent: spotQuery.data.tent,
        contact_phone: spotQuery.data.contact_phone,
        contact_email: spotQuery.data.contact_email,
        contact_page: spotQuery.data.contact_page,
        contact_instagram: spotQuery.data.contact_instagram,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spotQuery.isSuccess]);
  const handleSelectTab = (tab: EditableTab) => {
    setSelectedTab(tab);
    editableArea.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (spotQuery.isLoading || !spotQuery.data)
    return (
      <div className="mx-auto grid h-screen w-full max-w-screen-xl place-items-center pt-16">
        <div className="relative aspect-square w-32"></div>
        <LoadingSpinner />
      </div>
    );
  return (
    <div className="mx-auto min-h-screen w-full max-w-screen-xl p-2 pt-16">
      <ViewHeader>
        <ViewTitle>{spotQuery.data.name}</ViewTitle>
        <ViewSubtitle>tryb edycji</ViewSubtitle>
      </ViewHeader>
      <div className="flex h-full flex-col lg:flex-row">
        <Card className="min-h-full w-full lg:max-w-[250px]">
          <CardHeader>
            <CardTitle>Sekcja</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {editableTabs.map((editableTab) => (
              <Button
                variant="ghost"
                className={clsx("justify-start", {
                  "bg-primary-200 dark:bg-primary-dark":
                    selectedTab.id === editableTab.id,
                })}
                key={editableTab.id}
                onClick={() => handleSelectTab(editableTab)}
              >
                <span
                  className={cn(
                    selectedTab.id === editableTab.id
                      ? "text-secondary dark:text-secondary"
                      : "text-primary-dark dark:text-primary"
                  )}
                >
                  {editableTab.icon}
                </span>
                {editableTab.name}
              </Button>
            ))}
          </CardContent>
        </Card>
        <div ref={editableArea} className="min-h-full w-full">
          {selectedTab.id === "basics" && (
            <BasicsSpotForm
              city={city}
              name={name}
              province={province}
              setName={(name) => setField("name", name)}
              setCity={(city) => setField("city", city)}
              setProvince={(province) => setField("province", province)}
              className="min-h-full w-full"
            />
          )}
          {selectedTab.id === "details" && (
            <DetailsSpotForm
              className="w-full"
              area={area}
              spinning={spinning}
              accommodation={accommodation}
              tent={tent}
              night_fishing={night_fishing}
              setArea={(area) => setField("area", area)}
              setTent={(tent) => setField("tent", tent)}
              setAccommodation={(accommodation) =>
                setField("accommodation", accommodation)
              }
              setNightFishing={(night_fishing) =>
                setField("night_fishing", night_fishing)
              }
              setSpinning={(spinning) => setField("spinning", spinning)}
            />
          )}
          {selectedTab.id === "description" && (
            <DescriptionSpotForm
              className="w-full"
              description={description}
              setDescription={(description) =>
                setField("description", description)
              }
            />
          )}
          {selectedTab.id === "position" && (
            <SelectPositionMap
              className="w-full"
              position={{ lat, lng }}
              setPosition={(position) => {
                setField("lat", position.lat);
                setField("lng", position.lng);
              }}
              setCity={(province) => setField("province", province)}
              setProvince={(city) => setField("city", city)}
            />
          )}
          {selectedTab.id === "fish_types" && (
            <FishTypeSpotForm
              className="w-full"
              fishTypes={fish_types}
              setFishTypes={(fishTypes) => setField("fish_types", fishTypes)}
            />
          )}
          {selectedTab.id === "prices" && (
            <PricingSpotForm
              className="w-full"
              prices={prices}
              setPrices={(prices) => setField("prices", prices)}
            />
          )}
          {/* {selectedTab.id === "images" && (
            <ImagesSpotForm
            images={images}
            onUpload={(imageId) => setField("images", [...images, imageId])}
          />
          )

          } */}
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
