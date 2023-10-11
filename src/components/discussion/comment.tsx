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
import AttachmentPreview from "../ui/attachment-preview";
import { useAutoAnimate } from "@formkit/auto-animate/react";

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
  const [newCommentContainer] = useAutoAnimate();
  useDebugLog(props);
  const attachment = props.comment.attachment[0];
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
          {/** Display attachment as image or file based on it's type **/}
          {attachment?.type.startsWith("image") && (
            <div className="relative aspect-video w-96">
              <Image src={attachment.url} alt="" fill />
            </div>
          )}
          {attachment && !attachment.type.startsWith("image") && (
            <div className="my-4">
              <AttachmentPreview
                type={attachment.type}
                url={attachment.url}
                name={attachment.name}
              />
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
      <div ref={newCommentContainer}>
        {isReplying && <NewComment discussionId={props.comment.discussionId} />}
      </div>
    </>
  );
};

export default Comment;
