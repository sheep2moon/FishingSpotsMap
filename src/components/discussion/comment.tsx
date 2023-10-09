import { type ReactionType } from "@prisma/client";
import React from "react";
import { timePassedFromNow } from "../../lib/helpers/timePassedFromNow";
import { Card, CardContent, CardHeader } from "../ui/card";
import { IconBulb, IconThumbDown, IconThumbUp } from "@tabler/icons-react";
import Avatar from "../ui/avatar";
import { type RouterOutputs } from "../../lib/utils/api";
import { useDebugLog } from "../../hooks/useDebugLog";

type Reaction = (typeof ReactionType)[keyof typeof ReactionType];

const reactions: { name: string; key: Reaction; icon: React.ReactNode }[] = [
  {
    key: "LIKE",
    name: "Podoba mi się",
    icon: <IconThumbUp />,
  },
  {
    key: "DISLIKE",
    name: "Nie podoba mi się",
    icon: <IconThumbDown />,
  },
  {
    key: "HELPFUL",
    name: "Pomocne",
    icon: <IconBulb />,
  },
];

type CommentProps = {
  comment: RouterOutputs["discussion"]["getDiscussionById"]["comments"][number];
};
const Comment = (props: CommentProps) => {
  useDebugLog(props);
  return (
    <Card className="py-2">
      <CardHeader className="px-4 py-2">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <Avatar
              className="w-6"
              imageSrc={props.comment.author.image || ""}
            />
            <span>{props.comment.author.name}</span>
          </div>
          <span>{timePassedFromNow(props.comment.createdAt)}</span>
        </div>
      </CardHeader>
      <CardContent className="px-4 py-0">
        <p className="my-1 rounded-sm p-2 dark:bg-primary-dark/40">
          {props.comment.content}
        </p>
        <div className="flex justify-end gap-2">
          {reactions.map((reaction) => (
            <button
              className="flex gap-1 bg-transparent p-2"
              key={reaction.key}
            >
              {reaction.icon}
              <span>{reaction.name}</span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Comment;
