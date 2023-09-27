import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { api } from "../../lib/utils/api";
import Image from "next/image";
import { getSpotImageSrc } from "../../lib/utils/getImageSrc";
import PricingTable from "../../components/fishing-spot/PricingTable";
import AddReview from "../../components/fishing-spot/AddReview";
import Reviews from "../../components/fishing-spot/Reviews";
import {
  IconEdit,
  IconMapPinPin,
  IconNavigation,
  IconNavigationFilled,
  IconRuler,
} from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import { IconMapSearch } from "@tabler/icons-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import ModeratorOnly from "../../components/ModeratorOnly";
import { InternalLink } from "../../components/ui/internal-link";
import {
  ViewHeader,
  ViewSubtitle,
  ViewTitle,
} from "../../components/ui/view-header";
import ImageCarousel from "../../components/fishing-spot/image-carousel";
import MarkdownContent from "../../components/markdown-editor/MarkdownContent";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";

const FishingSpot = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const spotQuery = api.fishery.getFishingSpot.useQuery({ id });
  const session = useSession();

  if (!spotQuery.data || spotQuery.isLoading) return <div>skeleton</div>;
  return (
    <div className="shadow-dark/40 mx-auto mt-16 flex min-h-screen w-full max-w-7xl flex-col pb-24 shadow-lg">
      {/* <div className="flex justify-between px-4">
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
      </div> */}
      <ViewHeader>
        <ViewTitle>{spotQuery.data.name}</ViewTitle>
        <ViewSubtitle className="flex items-center gap-2">
          <IconMapPinPin className="" />
          {spotQuery.data.city}
          {", woj. "}
          {spotQuery.data.province}
        </ViewSubtitle>
      </ViewHeader>
      <ImageCarousel images={spotQuery.data.images} />

      <Card>
        <CardHeader>
          <CardTitle>
            <IconMapPinPin />
            Lokalizacja
          </CardTitle>
          <CardDescription>
            {spotQuery.data.city}
            {", woj. "}
            {spotQuery.data.province}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex max-w-lg items-center gap-2">
            <InternalLink
              className="w-full"
              href={`/fishing-spots-map?flyTo=${spotQuery.data.lat},${spotQuery.data.lng}`}
            >
              <IconMapSearch />
              <span>Zobacz na mapie</span>
            </InternalLink>
            <Button className="w-full">
              <IconNavigation />
              Nawiguj
            </Button>
          </div>
        </CardContent>
      </Card>
      {/* 
      <div className="mt-4 grid w-full grid-cols-1 lg:grid-cols-3">
        <div className="flex w-full flex-col justify-center">
          <div className="flex items-center justify-center gap-2">
            <span>średnia ocena</span>
            <span className="text-lg font-bold">{spotQuery.data.rating}</span>
          </div>
          <div className="border-dark/60 mx-auto mt-4 flex gap-2 border-b-2">
            <span>{spotQuery.data.reviews.length}</span>
            <span>opini użytkowników</span>
          </div>
        </div>
      </div> */}

      <div className="grid grid-cols-1 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Podstawowe informacje</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-dark mt-8 flex flex-col gap-1 px-4">
              <div className="flex items-center justify-between gap-3 rounded-sm  py-1">
                <span className="text-center">Nocleg</span>
                <span className="font-bold">
                  {spotQuery.data.accommodation ? "TAK" : "NIE"}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3 rounded-sm   py-1">
                <span className="text-center">Spinning</span>
                <span className="font-bold">
                  {spotQuery.data.spinning ? "TAK" : "NIE"}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3 rounded-sm   py-2">
                <span className="text-center">Miejsce namiotowe</span>
                <span className="font-bold">
                  {spotQuery.data.tent ? "TAK" : "NIE"}
                </span>
              </div>
              <div className="flex  items-center justify-between gap-3 rounded-sm   py-1">
                <span className="text-center">Łowienie w nocy</span>
                <span className="font-bold">
                  {spotQuery.data.night_fishing ? "TAK" : "NIE"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Występujące gatunki ryb</CardTitle>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="mt-8">
          <MarkdownContent text={spotQuery.data.description} />
        </CardContent>
      </Card>

      <h5 className="text-dark/80 py-2 text-lg font-bold uppercase">
        {spotQuery.data.prices.length > 0
          ? "Cennik"
          : "To miejsce nie posiada cennika"}
      </h5>
      <PricingTable prices={spotQuery.data.prices} />
      {session.data?.user &&
        !spotQuery.data.reviews.some(
          (review) => review.createdBy === session.data.user.id
        ) && <AddReview spotId={id} />}
      {spotQuery.data.reviews && <Reviews reviews={spotQuery.data.reviews} />}
    </div>
  );
};

export default FishingSpot;
