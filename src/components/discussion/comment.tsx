import { type ReactionType } from "@prisma/client";
import React, { useState } from "react";
import { timePassedFromNow } from "../../lib/helpers/timePassedFromNow";
import { Card, CardContent, CardHeader } from "../ui/card";
import {
  IconBulb,
  IconCornerDownRight,
  IconThumbDown,
  IconThumbUp,
} from "@tabler/icons-react";
import Avatar from "../ui/avatar";
import { type RouterOutputs } from "../../lib/utils/api";
import { useDebugLog } from "../../hooks/useDebugLog";
import { Button } from "../ui/button";
import NewComment from "./new-comment";
import Image from "next/image";

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
  const [isReplying, setIsReplying] = useState(false);

  useDebugLog(props);

  return (
    <>
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
          <p className="my-1 rounded-md p-2 dark:bg-primary-dark/30">
            {props.comment.content}
          </p>
          {props.comment.attachment[0]?.type.startsWith("image") && (
            <div className="relative aspect-video w-96">
              <Image src={props.comment.attachment[0].url} alt="" fill />
            </div>
          )}
          <div className="flex justify-between text-sm">
            <Button variant="ghost" onClick={() => setIsReplying(true)}>
              <IconCornerDownRight />
              Odpowiedz
            </Button>
            <div className="flex gap-2 text-sm">
              {reactions.map((reaction) => (
                <button
                  className="flex items-center gap-1 bg-transparent p-2"
                  key={reaction.key}
                >
                  {reaction.icon}
                  <span>{reaction.name}</span>
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      <NewComment discussionId={props.comment.discussionId} />
    </>
  );
};

export default Comment;
