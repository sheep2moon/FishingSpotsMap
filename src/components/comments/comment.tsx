import { type ReactionType } from "@prisma/client";
import React, { useState } from "react";
import { timePassedFromNow } from "../../lib/helpers/timePassedFromNow";
import { Card, CardContent, CardHeader } from "../ui/card";
import {
  IconBulb,
  IconCornerDownRight,
  IconDots,
  IconThumbDown,
  IconThumbUp,
} from "@tabler/icons-react";
import Avatar from "../ui/avatar";
import { api, type RouterOutputs } from "../../lib/utils/api";
import { Button } from "../ui/button";
import Image from "next/image";
import AttachmentPreview from "../ui/attachment-preview";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import CurrentUserOnly from "../current-user-only";
import { cn } from "../../lib/utils/cn";
import { type NewCommentTarget } from "./comment-section";

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

export type ReplyTo =
  RouterOutputs["comment"]["getComments"][number]["replyTo"];

type CommentProps = {
  comment: RouterOutputs["comment"]["getComments"][number]["childrens"][number];
  setNewCommentProps: (props: NewCommentTarget) => void;
};
const Comment = (props: CommentProps) => {
  const attachment = props.comment.attachment[0];
  const [isLoading, setIsLoading] = useState(false);
  const { mutateAsync: deleteComment } =
    api.comment.deleteComment.useMutation();
  const ctx = api.useContext();

  const handleDeleteComment = async () => {
    setIsLoading(true);
    await deleteComment({ commentId: props.comment.id });
    void (await ctx.comment.getComments.invalidate({
      catchId: props.comment.catchId || undefined,
      discussionId: props.comment.discussionId || undefined,
    }));
    setIsLoading(false);
  };

  return (
    <Card
      className={cn(
        "py-2",
        isLoading && "pointer-events-none animate-pulse opacity-30"
      )}
    >
      <CardHeader className="px-4 py-1">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <Avatar
              className="w-8"
              imageSrc={props.comment.author.image || ""}
            />
            <div className="flex flex-col text-sm">
              <span>{props.comment.author.name}</span>
              <span className="text-xs dark:text-primary/60">
                {timePassedFromNow(props.comment.createdAt)}
              </span>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                <IconDots />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Zgłoś</DropdownMenuItem>
              <CurrentUserOnly userId={props.comment.author.id}>
                <DropdownMenuItem onClick={() => void handleDeleteComment()}>
                  Usuń
                </DropdownMenuItem>
              </CurrentUserOnly>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="px-4 py-0">
        {props.comment.replyTo && (
          <span className="p-1 text-sm dark:text-primary/60">
            Odpowiedź do{" "}
            <span className="text-sky-700 dark:text-sky-300">
              {props.comment.replyTo.author.name}
            </span>
          </span>
        )}
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
          <Button
            variant="ghost"
            onClick={() =>
              props.setNewCommentProps({
                parentId: props.comment.parentId || props.comment.id,
                replyTo: {
                  author: {
                    name: props.comment.author.name,
                  },
                  id: props.comment.id,
                },
              })
            }
          >
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
                <span className="hidden sm:inline">{reaction.name}</span>
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Comment;
