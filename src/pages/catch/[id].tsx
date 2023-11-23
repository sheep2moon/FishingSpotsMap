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

const CatchPage = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const { data, isLoading } = api.catch.getCatch.useQuery({ id });
  if (!data || isLoading) return <LoadingSpinner />;
  return (
    <div className="mt-16 w-screen max-w-screen-xl p-4">
      <Card className="rounded-sm dark:bg-primary-dark">
        <CardHeader className="p-1 px-2">
          <CardTitle className="m-0 flex flex-col items-start gap-0 text-base">
            <div className="mt-2 flex justify-between">
              <span>{data.fishingSpot?.name}</span>
              {data.date && <TimeBadge date={data.date} />}
            </div>

            <span className="text-xs">
              Dodane przez:
              <span className="text-sky-300/60">{data.user.name}</span>
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col p-2">
          <div className="relative aspect-video h-36 self-start">
            <Image
              className="object-cover"
              fill
              src={getCatchImageSrc(data.images[0]?.id)}
              alt=""
            />
          </div>
          <span>{data.fish_type}</span>
          <span>{(data.weight / 1000).toFixed(2).replace(".", ",")} kg</span>
          <span>{data.length}cm</span>
          <p>{data.description}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CatchPage;
