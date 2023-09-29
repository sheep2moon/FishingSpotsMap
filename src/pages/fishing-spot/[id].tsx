import { useRouter } from "next/router";
import React from "react";
import { api } from "../../lib/utils/api";
import Reviews from "../../components/fishing-spot/Reviews";
import {
  IconChevronLeft,
  IconEdit,
  IconMapPinPin,
  IconNavigation,
  IconStar,
  IconStarFilled,
} from "@tabler/icons-react";
import { IconMapSearch } from "@tabler/icons-react";
import ModeratorOnly from "../../components/ModeratorOnly";
import { InternalLink } from "../../components/ui/internal-link";
import { ViewHeader, ViewTitle } from "../../components/ui/view-header";
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
import AddReview from "../../components/fishing-spot/add-review";
import AuthOnly from "../../components/auth-only";

const FishingSpot = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const spotQuery = api.fishery.getFishingSpot.useQuery({ id });
  const userQuery = api.users.getPrivateUser.useQuery();
  const followMutation = api.users.followFishingSpot.useMutation();
  const unfollowMutation = api.users.unfollowFishingSpot.useMutation();

  const followFishingSpot = async () => {
    await followMutation.mutateAsync({ spotId: id });
    await userQuery.refetch();
    console.log("ee");
  };
  const unfollowFishingSpot = async () => {
    await unfollowMutation.mutateAsync({ spotId: id });
    await userQuery.refetch();
  };

  React.useEffect(() => {
    console.log(followMutation);
  }, [followMutation]);

  if (!spotQuery.data || spotQuery.isLoading) return <div>skeleton</div>;
  return (
    <div className="shadow-dark/40 mx-auto mt-16 flex min-h-screen w-full max-w-7xl flex-col gap-2 px-2 pb-24 shadow-lg">
      <div className="flex w-full items-center">
        <InternalLink
          variant="link"
          href={`/fishing-spots-map?flyTo=${spotQuery.data.lat},${spotQuery.data.lng}`}
        >
          <IconChevronLeft />
          <span>Powrót do mapy</span>
          <IconMapSearch />
        </InternalLink>
        <div className="ml-auto flex items-center gap-2">
          <AuthOnly>
            {userQuery.data?.followedSpots.some(
              (followedSpot) => followedSpot.id === id
            ) ? (
              <Button
                variant="outline"
                disabled={!!unfollowMutation.isLoading}
                onClick={() => void unfollowFishingSpot()}
              >
                <IconStarFilled className="text-amber-300" />
                Obserwujesz
              </Button>
            ) : (
              <Button
                variant="outline"
                disabled={!!followMutation.isLoading}
                onClick={() => void followFishingSpot()}
              >
                <IconStar />
                Obserwuj
              </Button>
            )}
          </AuthOnly>
          <ModeratorOnly>
            <InternalLink
              variant="destructive"
              href={`/fishing-spot/edit/${spotQuery.data.id}`}
              className="gap-2"
            >
              <IconEdit />
              Edytuj
            </InternalLink>
          </ModeratorOnly>
        </div>
      </div>
      <ViewHeader>
        <ViewTitle>{spotQuery.data.name}</ViewTitle>
      </ViewHeader>

      <Card>
        <CardContent className="mt-8">
          <ImageCarousel images={spotQuery.data.images} />
        </CardContent>
      </Card>

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

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
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

      <Card>
        <CardHeader>
          <CardTitle>Cennik</CardTitle>
        </CardHeader>
        <CardContent className="max-w-lg">
          {spotQuery.data.prices.map((price, index) => (
            <div
              className="m-1 grid grid-cols-2 rounded-sm border px-2 py-1 dark:border-primary/20 dark:bg-primary-dark/30"
              key={`${price.title}-${index}`}
            >
              <span>{price.title}</span>
              <span>{price.value}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="">
        <CardHeader>
          <CardTitle className="block w-full text-center">Opinie</CardTitle>
          <CardDescription>{}</CardDescription>
        </CardHeader>
        <CardContent>
          <AuthOnly>
            <AddReview className="mt-4" spotId={spotQuery.data.id} />
          </AuthOnly>

          <Reviews reviews={spotQuery.data.reviews} />
        </CardContent>
      </Card>
    </div>
  );
};

export default FishingSpot;
