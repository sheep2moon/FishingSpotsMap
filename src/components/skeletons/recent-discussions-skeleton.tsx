import React from "react";
import { Skeleton } from "../ui/skeleton";

const RecentDiscussionsSkeleton = () => {
  return (
    <>
      <Skeleton className="h-72" />
      <Skeleton className="h-72" />
    </>
  );
};

export default RecentDiscussionsSkeleton;
