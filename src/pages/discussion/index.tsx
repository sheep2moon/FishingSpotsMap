import React from "react";
import { InternalLink } from "../../components/ui/internal-link";
import { api } from "../../lib/utils/api";
import LoadingSpinner from "../../components/ui/loading-view";

import { IconPlus } from "@tabler/icons-react";
import {
  ViewHeader,
  ViewSubtitle,
  ViewTitle,
} from "../../components/ui/view-header";
import DiscussionCard from "../../components/discussion/discussion-card";

const Discussion = () => {
  const discussionsQuery = api.discussion.getDiscussions.useQuery();
  if (discussionsQuery.isLoading || !discussionsQuery.data)
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  return (
    <div className="mx-auto mt-16 flex w-full max-w-screen-xl flex-col gap-6 p-2 pb-16 text-xl">
      <ViewHeader>
        <ViewTitle>Dyskusje</ViewTitle>
        <ViewSubtitle>
          <InternalLink className="text-xl" href="/discussion/new">
            <IconPlus />
            Stwórz dyskusje
          </InternalLink>
        </ViewSubtitle>
      </ViewHeader>
      <div className="grid grid-cols-1 gap-1 md:grid-cols-2">
        {discussionsQuery.data.map((discussion) => (
          <DiscussionCard discussion={discussion} key={discussion.id} />
        ))}
      </div>
    </div>
  );
};

export default Discussion;
