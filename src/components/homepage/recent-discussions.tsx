import React from "react";
import { api } from "../../lib/utils/api";
import DiscussionCard from "../discussion/discussion-card";
import { IconChevronsRight, IconMessageCircle } from "@tabler/icons-react";
import Link from "next/link";

const RecentDiscussions = () => {
  const { data, isLoading } = api.discussion.getRecentDiscussions.useQuery({});
  if (isLoading || !data) return <div>discussion skeleton...</div>;
  return (
    <div className="mt-8 flex flex-col gap-2 px-2 dark:text-primary">
      <div className="flex items-center justify-between">
        <h2 className="flex gap-2 text-xl font-semibold">
          <IconMessageCircle className="text-secondary" />
          Najnowsze dyskusje
        </h2>
        <Link
          href="/fishing-spot/spot-search"
          className="flex items-center gap-1 dark:text-primary"
        >
          zobacz więcej <IconChevronsRight />
        </Link>
      </div>
      <div className="grid w-full grid-cols-2 gap-2">
        {data.map((discussion) => (
          <DiscussionCard key={discussion.id} discussion={discussion} />
        ))}
      </div>
    </div>
  );
};

export default RecentDiscussions;
