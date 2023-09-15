import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { api } from "../../utils/api";
import Image from "next/image";
import { getSpotImageSrc } from "../../utils/getImageSrc";
import EditableBlock from "../../components/fishing-spot/EditableBlock";
import PricingTable from "../../components/fishing-spot/PricingTable";
import AddReview from "../../components/fishing-spot/AddReview";
import Reviews from "../../components/fishing-spot/Reviews";
import { IconEdit, IconMapPinPin, IconRuler } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import Button from "../../components/common/Button";
import { IconMapSearch } from "@tabler/icons-react";
import Link from "next/link";
import InternalLink from "../../components/common/InternalLink";
import HorizontalLine from "../../components/common/HorizontalLine";
import { marked } from "marked";
import ReactMarkdown from "react-markdown";
import ModeratorOnly from "../../components/ModeratorOnly";

const FishingSpot = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const spotQuery = api.fishery.getFishingSpot.useQuery({ id });
  const [selectedImage, setSelectedImage] = useState("");
  const session = useSession();
  useEffect(() => {
    if (spotQuery.data?.images[0]) {
      setSelectedImage(spotQuery.data.images[0].id);
    }
  }, [spotQuery.data]);

  if (!spotQuery.data || spotQuery.isLoading) return <div>skeleton</div>;
  return (
    <div className="shadow-dark/40 mx-auto mt-16 flex min-h-screen w-full max-w-7xl flex-col pb-24 shadow-lg">
      <div className="flex justify-between px-4">
        <div className="text-dark flex w-full flex-col justify-center py-2">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">{spotQuery.data.name}</h1>
            <ModeratorOnly>
              <InternalLink
                href={`/fishing-spot/edit/${spotQuery.data.id}`}
                className="gap-2"
              >
                <IconEdit />
                Edytuj
              </InternalLink>
            </ModeratorOnly>
          </div>
          <span className="text-dark/60 flex items-center gap-2">
            <IconMapPinPin className="" />
            {spotQuery.data.city}
            {", woj. "}
            {spotQuery.data.province}
          </span>
          {spotQuery.data.lat && spotQuery.data.lng && (
            <InternalLink
              className="mt-2 self-start"
              href={`/fishing-spots-map?flyTo=${spotQuery.data.lat},${spotQuery.data.lng}`}
            >
              <IconMapSearch />
              <span>Zobacz na mapie</span>
            </InternalLink>
          )}
        </div>
      </div>
      <div className="mt-4 grid w-full grid-cols-1 lg:grid-cols-3">
        <div className="p-2 lg:col-span-2">
          <div className="relative aspect-video max-h-[500px] w-full bg-primary-200 object-cover dark:bg-primary-800">
            <Image
              alt="widok"
              className="rounded-md object-contain"
              fill
              src={getSpotImageSrc(selectedImage)}
            />
          </div>
          <div className="overeflow-x-auto flex gap-1">
            {spotQuery.data.images.map((image) => (
              <div
                onClick={() => setSelectedImage(image.id)}
                className="relative aspect-square w-28"
                key={image.id}
              >
                <Image
                  className="rounded-sm object-cover"
                  alt="widok"
                  fill
                  src={getSpotImageSrc(image.id)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex w-full flex-col justify-center">
          <div className="flex items-center justify-center gap-2">
            <span>średnia ocena</span>
            <span className="text-lg font-bold">{spotQuery.data.rating}</span>
          </div>
          <div className="border-dark/60 mx-auto mt-4 flex gap-2 border-b-2">
            <span>{spotQuery.data.reviews.length}</span>
            <span>opini użytkowników</span>
          </div>
          <div className="text-dark mt-8 flex flex-col gap-1 px-4">
            <div className="flex items-center justify-between gap-3 rounded-sm  py-1">
              <span className="text-center">Nocleg</span>
              <span className="font-bold">
                {spotQuery.data.accommodation ? "TAK" : "NIE"}
              </span>
            </div>
            <HorizontalLine />
            <div className="flex items-center justify-between gap-3 rounded-sm   py-1">
              <span className="text-center">Spinning</span>
              <span className="font-bold">
                {spotQuery.data.spinning ? "TAK" : "NIE"}
              </span>
            </div>
            <HorizontalLine />
            <div className="flex items-center justify-between gap-3 rounded-sm   py-2">
              <span className="text-center">Miejsce namiotowe</span>
              <span className="font-bold">
                {spotQuery.data.tent ? "TAK" : "NIE"}
              </span>
            </div>
            <HorizontalLine />
            <div className="flex  items-center justify-between gap-3 rounded-sm   py-1">
              <span className="text-center">Łowienie w nocy</span>
              <span className="font-bold">
                {spotQuery.data.night_fishing ? "TAK" : "NIE"}
              </span>
            </div>
            <HorizontalLine />
          </div>
        </div>
      </div>

      {/* <HorizontalLine className="mb-2" /> */}
      {/* <div className=" rounded-t-2xl border-t-2 border-t-secondary bg-light px-2 pt-4 leading-3 text-dark" /> */}
      <div className="mt-2 px-3 pr-6">
        <h5 className="text-dark/80 mt-4 text-lg font-bold uppercase">
          Występujące typy ryb
        </h5>
        <div className="text-dark flex flex-wrap gap-1">
          {spotQuery.data.fish_types.map((fishType) => (
            <div
              className="rounded-sm border  px-2 py-1 dark:bg-primary-800"
              key={fishType}
            >
              {fishType}
            </div>
          ))}
        </div>

        <h5 className="text-dark/80 mt-4 text-lg font-bold uppercase">Opis</h5>

        <div className="shadow-dark/40 rounded-sm px-4 py-2 shadow-sm dark:bg-primary-dark">
          <ReactMarkdown>{spotQuery.data.description}</ReactMarkdown>
          {/* <pre>{marked.parse(spotQuery.data.description)}</pre> */}
        </div>

        <h5 className="text-dark/80 py-2 text-lg font-bold uppercase">
          {spotQuery.data.prices.length > 0
            ? "Cennik"
            : "To miejsce nie posiada cennika"}
        </h5>
        <PricingTable prices={spotQuery.data.prices} />
      </div>
      {session.data?.user &&
        !spotQuery.data.reviews.some(
          (review) => review.createdBy === session.data.user.id
        ) && <AddReview spotId={id} />}
      {spotQuery.data.reviews && <Reviews reviews={spotQuery.data.reviews} />}
    </div>
  );
};

export default FishingSpot;
