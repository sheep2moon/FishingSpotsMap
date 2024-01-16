import React, { useState } from "react";
import { InternalLink } from "../../components/ui/internal-link";
import { api } from "../../lib/utils/api";

import { IconPlus } from "@tabler/icons-react";
import {
  ViewHeader,
  ViewSubtitle,
  ViewTitle,
} from "../../components/ui/view-header";
import DiscussionCard from "../../components/discussion/discussion-card";
import LoadingView from "../../components/ui/loading-view";
import { Button } from "../../components/ui/button";
import { cn } from "../../lib/utils/cn";
import Tag from "../../components/ui/tag";

const Discussion = () => {
  const [selectedTag, setSelectedTag] = useState<string | undefined>(undefined);
  const discussionsQuery = api.discussion.getDiscussions.useQuery({
    tag: selectedTag,
  });

  const tagsQuery = api.tags.getTags.useQuery();

  const handleToggleTag = (tagName: string) => {
    if (selectedTag === tagName) {
      setSelectedTag(undefined);
    } else {
      setSelectedTag(tagName);
    }
  };

  if (
    discussionsQuery.isLoading ||
    !discussionsQuery.data ||
    tagsQuery.isLoading ||
    !tagsQuery.data
  )
    return <LoadingView />;
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
      <div className="flex items-center gap-4">
        <p>Filtruj dyskusje</p>
        <div className="flex gap-1">
          {tagsQuery.data.map((tag) => (
            <Button
              onClick={() => handleToggleTag(tag.name)}
              className={cn(
                "",
                selectedTag === tag.name && "dark:border-secondary"
              )}
              key={tag.id}
              variant="outline"
            >
              <Tag tagName={tag.name} />
            </Button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-1 md:grid-cols-2">
        {discussionsQuery.data.map((discussion) => (
          <DiscussionCard discussion={discussion} key={discussion.id} />
        ))}
      </div>
    </div>
  );
};

export default Discussion;
