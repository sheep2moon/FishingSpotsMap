import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { api } from "../../utils/api";
import Image from "next/image";
import { getSpotImageSrc } from "../../utils/getImageSrc";
import EditableBlock from "../../components/fishing-spot/EditableBlock";
import PricingTable from "../../components/fishing-spot/PricingTable";
import AddReview from "../../components/fishing-spot/AddReview";
import Reviews from "../../components/fishing-spot/Reviews";
import { IconMapPinPin, IconRuler } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import mapIconSrc from "../../assets/map-icon.svg";
import Button from "../../components/common/Button";
import { IconMapSearch } from "@tabler/icons-react";
import Link from "next/link";

const FishingSpot = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const spotQuery = api.fishery.getFishingSpot.useQuery({ id });

  // const [mediaSrcId, setMediaSrcId] = useState<"position-map" | string>(
  //   "position-map"
  // );
  const [selectedImage, setSelectedImage] = useState("");
  const session = useSession();
  useEffect(() => {
    if (spotQuery.data?.imagesId[0]) {
      setSelectedImage(spotQuery.data?.imagesId[0]);
    }
  }, [spotQuery.data]);
  // const PositionMap = dynamic(
  //   () => import("../../components/map/PositionMap"),
  //   { ssr: false }
  // );
  if (!spotQuery.data || spotQuery.isLoading) return <div>skeleton</div>;
  return (
    <div className="mt-16 flex min-h-screen w-full max-w-7xl flex-col pb-24 shadow-lg shadow-dark/40">
      <div className="flex justify-between px-4">
        <div className="flex flex-col justify-center py-2 text-dark">
          <h1 className="text-3xl font-bold">{spotQuery.data.name}</h1>
          <span className="flex items-center gap-2 text-dark/60">
            <IconMapPinPin className="" />
            {spotQuery.data.city}
            {", woj. "}
            {spotQuery.data.province}
          </span>
        </div>
        {spotQuery.data.lat && spotQuery.data.lng && (
          <Link
            href={`/fishing-spots-map?flyTo=${spotQuery.data.lat},${spotQuery.data.lng}`}
            className="flex items-center gap-2 self-center rounded-md bg-accent px-3 py-2 shadow-sm shadow-dark/40"
          >
            <IconMapSearch />
            <span>Zobacz na mapie</span>
          </Link>
        )}
      </div>
      <div className="mt-4 w-full sm:grid sm:grid-cols-4">
        <div className="relative aspect-video max-h-[500px] w-full object-cover sm:col-span-3">
          <Image
            alt="widok"
            className="rounded-md object-cover"
            fill
            src={getSpotImageSrc(selectedImage)}
          />
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex items-center justify-center gap-2">
            <span>ocena</span>
            <span className="text-lg font-bold">8.8</span>
          </div>
          <div className="mx-auto mt-4 flex gap-2 border-b-2 border-dark/60">
            <span>0</span>
            <span>opini użytkowników</span>
          </div>
          <div className="mx-auto mt-8 flex w-48 flex-col gap-1 text-dark ">
            <div className="flex items-center justify-between gap-3 rounded-sm  py-1">
              <span className="text-center text-sm">Nocleg</span>
              <span className="font-bold">
                {spotQuery.data.accommodation ? "TAK" : "NIE"}
              </span>
            </div>
            <div className="flex items-center justify-between gap-3 rounded-sm   py-1">
              <span className="text-center text-sm">Spinning</span>
              <span className="font-bold">
                {spotQuery.data.spinning ? "TAK" : "NIE"}
              </span>
            </div>
            <div className="flex items-center justify-between gap-3 rounded-sm   py-2">
              <span className="text-center text-sm">Miejsce namiotowe</span>
              <span className="font-bold">
                {spotQuery.data.tent ? "TAK" : "NIE"}
              </span>
            </div>
            <div className="flex  items-center justify-between gap-3 rounded-sm   py-1">
              <span className="text-center text-sm">Łowienie w nocy</span>
              <span className="font-bold">
                {spotQuery.data.night_fishing ? "TAK" : "NIE"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        {spotQuery.data.imagesId.map((imageId) => (
          <div
            onClick={() => setSelectedImage(imageId)}
            className="relative aspect-square w-28"
            key={imageId}
          >
            <Image
              className="rounded-md border-2 border-gray-400 object-cover"
              alt="widok"
              fill
              src={getSpotImageSrc(imageId)}
            />
          </div>
        ))}
      </div>
      {/* <HorizontalLine className="mb-2" /> */}
      {/* <div className=" rounded-t-2xl border-t-2 border-t-secondary bg-light px-2 pt-4 leading-3 text-dark" /> */}
      <div className="mt-2 px-3 pr-6">
        <EditableBlock target="">
          <h5 className="mt-4 text-lg font-bold uppercase text-dark/80">
            Występujące typy ryb
          </h5>
          <div className="flex flex-wrap gap-1 text-dark">
            {spotQuery.data.fish_types.map((fishType) => (
              <div
                className="rounded-sm border border-gray-600/20 bg-white p-2 shadow shadow-primary/20"
                key={fishType}
              >
                {fishType}
              </div>
            ))}
          </div>
        </EditableBlock>

        <EditableBlock target="">
          <h5 className="mt-4 text-lg font-bold uppercase text-dark/80">
            Opis
          </h5>
          <pre className="font-montserrat whitespace-pre-wrap text-base leading-5 text-gray-600 ">
            {spotQuery.data.description}
          </pre>
        </EditableBlock>

        <EditableBlock target="">
          <h5 className="py-2 text-lg font-bold uppercase text-dark/80">
            {spotQuery.data.prices.length > 0
              ? "Cennik"
              : "To miejsce nie posiada cennika"}
          </h5>
          <PricingTable prices={spotQuery.data.prices} />
        </EditableBlock>
      </div>
      {session.data?.user && <AddReview spotId={id} />}
      {spotQuery.data.reviews && <Reviews reviews={spotQuery.data.reviews} />}
    </div>
  );
};

export default FishingSpot;
