import { useRouter } from "next/router";
import React, { useState } from "react";
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

const FishingSpot = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const { data, isLoading } = api.fishery.getFishingSpot.useQuery({ id });
  const [mediaSrcId, setMediaSrcId] = useState<"position-map" | string>(
    "position-map"
  );
  const session = useSession();
  const PositionMap = dynamic(
    () => import("../../components/map/PositionMap"),
    { ssr: false }
  );
  if (!data || isLoading) return <div>skeleton</div>;
  return (
    <div className="max-w-large flex min-h-screen flex-col bg-light pb-24 pt-16 shadow-md shadow-dark">
      <div className="relative aspect-video w-full">
        {mediaSrcId === "position-map" ? (
          <>
            {data.lat && data.lng && (
              <PositionMap position={{ lat: data.lat, lng: data.lng }} />
            )}
          </>
        ) : (
          <Image alt="widok" fill src={getSpotImageSrc(mediaSrcId)} />
        )}
      </div>
      <div className="relative -top-10 z-[99999] flex gap-1 px-1 small:-top-16">
        <div
          onClick={() => setMediaSrcId("position-map")}
          className="relative grid aspect-square w-20 place-items-center rounded-md border-2 border-gray-400 bg-gray-300 text-xl text-dark small:w-28"
        >
          <Image alt="widok" fill src={mapIconSrc as string} />
        </div>
        {data.imagesId.map((imageId) => (
          <div
            onClick={() => setMediaSrcId(imageId)}
            className="relative aspect-square w-20 small:w-28 "
            key={imageId}
          >
            <Image
              className="rounded-md border-2 border-gray-400"
              alt="widok"
              fill
              src={getSpotImageSrc(imageId)}
            />
          </div>
        ))}
      </div>
      {/* <HorizontalLine className="mb-2" /> */}
      {/* <div className=" rounded-t-2xl border-t-2 border-t-secondary bg-light px-2 pt-4 leading-3 text-dark" /> */}
      <div className="-mt-6 px-3 pr-6 small:-mt-12">
        <EditableBlock target="">
          <div className="flex flex-col items-center justify-center pb-2 text-dark">
            <h2 className="text-xl font-bold">{data.name}</h2>
            <span className="flex items-center gap-2 text-dark/60">
              <IconMapPinPin className="" />
              {data.city}
              {", woj. "}
              {data.province}
            </span>
            <div className="flex items-center gap-1 text-dark/60">
              <IconRuler />
              <span>{data.area}ha</span>
            </div>
          </div>
        </EditableBlock>
        <EditableBlock target="">
          <h5 className="mt-4 text-lg font-bold uppercase text-dark/80">
            Występujące typy ryb
          </h5>
          <div className="flex flex-wrap gap-1 text-dark">
            {data.fish_types.map((fishType) => (
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
          <div className="mt-4 grid grid-cols-4 gap-2 divide-x-2 text-dark ">
            <div className="flex flex-col items-center justify-center gap-3 rounded-sm  py-1">
              <span>Nocleg</span>
              <span className="font-bold">
                {data.accommodation ? "TAK" : "NIE"}
              </span>
            </div>
            <div className="flex flex-col items-center justify-center gap-3 rounded-sm   py-1">
              <span>Spinning</span>
              <span className="font-bold">{data.spinning ? "TAK" : "NIE"}</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-3 rounded-sm   py-2">
              <span className="text-center">Możliwość rozłożenia namiotu</span>
              <span className="font-bold">{data.tent ? "TAK" : "NIE"}</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-3 rounded-sm   py-1">
              <span className="text-center">Łowienie w nocy</span>
              <span className="font-bold">
                {data.night_fishing ? "TAK" : "NIE"}
              </span>
            </div>
          </div>
        </EditableBlock>

        <EditableBlock target="">
          <h5 className="mt-4 text-lg font-bold uppercase text-dark/80">
            Opis
          </h5>
          <pre className="font-montserrat whitespace-pre-wrap text-base leading-5 text-gray-600 ">
            {data.description}
          </pre>
        </EditableBlock>

        <EditableBlock target="">
          <h5 className="py-2 text-lg font-bold uppercase text-dark/80">
            {data.prices.length > 0
              ? "Cennik"
              : "To miejsce nie posiada cennika"}
          </h5>
          <PricingTable prices={data.prices} />
        </EditableBlock>
      </div>
      {session.data?.user && <AddReview spotId={id} />}
      {data.reviews && <Reviews reviews={data.reviews} />}
    </div>
  );
};

export default FishingSpot;
