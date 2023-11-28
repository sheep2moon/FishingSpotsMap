import { useRouter } from "next/router";
import React from "react";
import { api } from "../../lib/utils/api";
import LoadingSpinner from "../../components/ui/loading-spinner";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import TimeBadge from "../../components/ui/time-badge";
import Image from "next/image";
import { getCatchImageSrc } from "../../lib/utils/getImageSrc";
import { InternalLink } from "../../components/ui/internal-link";
import {
  IconArrowLeft,
  IconFish,
  IconMapPin,
  IconRuler3,
  IconWeight,
} from "@tabler/icons-react";
import Link from "next/link";
import Comments from "../../components/comments/comments";

const CatchPage = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const { data, isLoading } = api.catch.getCatch.useQuery({ id });
  if (!data || isLoading) return <LoadingSpinner />;
  return (
    <div className="mt-16 flex w-screen max-w-screen-xl flex-col p-4 pb-24">
      <InternalLink variant="link" href="/catch" className="self-start">
        <IconArrowLeft />
        Powrót do wszystkich połowów
      </InternalLink>
      <Card className="rounded-sm dark:bg-primary-dark">
        <CardHeader className="p-1 px-2">
          <CardTitle className="m-0 flex items-center justify-between px-2 text-lg">
            <div className="mt-2 flex items-center gap-2">
              <Link href="/" className="flex items-center gap-1">
                <IconMapPin /> {data.fishingSpot?.name}
              </Link>
              {data.date && <TimeBadge className="text-sm" date={data.date} />}
            </div>

            <span className="text-base">
              Dodane przez:
              <span className="text-sky-700 dark:text-sky-300/60">
                {data.user.name}
              </span>
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col p-2">
          <div className="relative mx-auto aspect-video w-full max-w-4xl self-start">
            <Image
              className="object-cover"
              fill
              src={getCatchImageSrc(data.images[0]?.id)}
              alt=""
            />
          </div>
          <div className="my-2 mt-4 grid grid-cols-1 gap-1 text-lg lg:grid-cols-3">
            <div className="flex flex-col items-center gap-2 rounded-sm bg-primary-950/50 px-4 pb-2 pt-1">
              <div className="flex w-full items-center justify-center gap-2 border-b border-primary/0 font-thin text-primary/80">
                <IconFish />
                <span>Ryba</span>
              </div>
              <span>{data.fish_type}</span>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-sm bg-primary-950/50 px-4 pb-2 pt-1">
              <div className="flex w-full items-center justify-center gap-2 border-b border-primary/0 font-thin text-primary/80">
                <IconWeight />
                <span>
                  {(data.weight / 1000).toFixed(2).replace(".", ",")} kg
                </span>
              </div>
              <span>{data.fish_type}</span>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-sm bg-primary-950/50 px-4 pb-2 pt-1">
              <div className="flex w-full items-center justify-center gap-2 border-b border-primary/0 font-thin text-primary/80">
                <IconRuler3 />
                <span>{data.length} cm</span>
              </div>
              <span>{data.fish_type}</span>
            </div>
          </div>
          <div>
            <h3 className="p-1 text-center text-lg font-bold">Opis</h3>
            <p className="rounded-sm bg-primary-950/40 px-4 py-2">
              {data.description}
            </p>
          </div>
        </CardContent>
      </Card>
      <Comments targetId={data.id} targetType="CATCH" />
    </div>
  );
};

export default CatchPage;
