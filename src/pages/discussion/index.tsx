import React from "react";
import { InternalLink } from "../../components/ui/internal-link";
import { api } from "../../lib/utils/api";
import LoadingSpinner from "../../components/ui/loading-spinner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import Avatar from "../../components/ui/avatar";
import Tag from "../../components/ui/tag";
import {
  IconMessage,
  IconPlus,
  IconSquareRoundedPlusFilled,
} from "@tabler/icons-react";
import Link from "next/link";
import {
  ViewHeader,
  ViewSubtitle,
  ViewTitle,
} from "../../components/ui/view-header";

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
          <Link key={discussion.id} href={`/discussion/${discussion.id}`}>
            <Card>
              <CardHeader>
                <h3 className="text-2xlxl truncate font-bold capitalize">
                  {discussion.title}
                </h3>
                <div className="flex justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <Avatar
                      className="w-8"
                      imageSrc={discussion.author.image || ""}
                    />
                    {discussion.author.name}
                  </div>
                  <div className="flex items-center gap-1">
                    <IconMessage />
                    {discussion.comments.length}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3 text-base dark:text-primary/80">
                  {discussion.content}
                </p>
                <div className="mt-4 flex gap-1">
                  {discussion.tags.map((tagR) => (
                    <Tag tagName={tagR.tag.name} key={tagR.tagId} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Discussion;
