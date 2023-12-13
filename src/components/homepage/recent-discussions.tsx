import React from "react";
import { api } from "../../lib/utils/api";
import DiscussionCard from "../discussion/discussion-card";
import { IconChevronsRight, IconMessageCircle } from "@tabler/icons-react";
import Link from "next/link";
import RecentDiscussionsSkeleton from "../skeletons/recent-discussions-skeleton";

const RecentDiscussions = () => {
  const { data } = api.discussion.getRecentDiscussions.useQuery({});
  return (
    <div className="mt-8 flex flex-col gap-2 px-2 dark:text-primary">
      <div className="flex items-center justify-between">
        <h2 className="flex gap-2 text-base font-semibold sm:text-xl">
          <IconMessageCircle className="text-secondary" />
          Najnowsze dyskusje
        </h2>
        <Link
          href="/fishing-spot/list"
          className="flex items-center gap-1 dark:text-primary"
        >
          Więcej <IconChevronsRight />
        </Link>
      </div>
      <div className="grid w-full grid-cols-1 gap-2 lg:grid-cols-2">
        {data ? (
          data.map((discussion) => (
            <DiscussionCard key={discussion.id} discussion={discussion} />
          ))
        ) : (
          <RecentDiscussionsSkeleton />
        )}
      </div>
    </div>
  );
};

export default RecentDiscussions;
