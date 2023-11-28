import React from "react";
import { Skeleton } from "../ui/skeleton";

const RecentFisheriesSkeleton = () => {
  return (
    <>
      <Skeleton className="h-60 w-full " />
      <Skeleton className="h-60 w-full" />
      <Skeleton className="h-60 w-full" />
      <Skeleton className="h-60 w-full" />
    </>
  );
};

export default RecentFisheriesSkeleton;
