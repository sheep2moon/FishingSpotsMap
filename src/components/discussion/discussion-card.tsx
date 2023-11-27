import React from "react";
import { type RouterOutputs } from "../../lib/utils/api";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "../ui/card";
import Avatar from "../ui/avatar";
import { IconMessage } from "@tabler/icons-react";
import Tag from "../ui/tag";

type DiscussionCardProps = {
  discussion: RouterOutputs["discussion"]["getDiscussions"][number];
};

const DiscussionCard = ({ discussion }: DiscussionCardProps) => {
  return (
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
  );
};

export default DiscussionCard;
