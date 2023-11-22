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
import { useAutoAnimate } from "@formkit/auto-animate/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import CurrentUserOnly from "../current-user-only";
import { cn } from "../../lib/utils/cn";
import type { NewCommentTarget } from "../../pages/discussion/[id]";

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
  RouterOutputs["discussion"]["getDiscussionById"]["comments"][number]["author"];

type CommentProps = {
  comment: RouterOutputs["discussion"]["getDiscussionById"]["comments"][number];
  setNewCommentProps: (props: NewCommentTarget) => void;
};
const Comment = (props: CommentProps) => {
  const [repliesContainer] = useAutoAnimate();
  const childrensQuery = api.discussion.getCommentChildrens.useQuery({
    commentId: props.comment.id,
  });

  return (
    <>
      <CommentCard {...props} />
      <div
        ref={repliesContainer}
        className="ml-4 flex flex-col gap-2 border-l-2 border-primary-dark/20 pl-2 dark:border-primary"
      >
        {childrensQuery.data &&
          childrensQuery.data.map((childComment) => (
            <CommentCard
              key={childComment.id}
              comment={childComment}
              setNewCommentProps={props.setNewCommentProps}
            />
          ))}

        {/* {replyTo && (
          <NewComment
            parentId={props.comment.id}
            replyTo={{
              id: props.comment.id,
              author: { name: props.comment.author.name },
            }}
            discussionId={props.comment.discussionId}
          />
        )} */}
      </div>
    </>
  );
};

export default Comment;

type CommentCardProps = CommentProps;

const CommentCard = (props: CommentCardProps) => {
  const attachment = props.comment.attachment[0];
  const [isLoading, setIsLoading] = useState(false);
  const { mutateAsync: deleteComment } =
    api.discussion.deleteComment.useMutation();
  const ctx = api.useContext();

  const handleDeleteComment = async () => {
    setIsLoading(true);
    await deleteComment({ commentId: props.comment.id });
    if (props.comment.parentId) {
      void ctx.discussion.getCommentChildrens.invalidate({
        commentId: props.comment.parentId,
      });
    } else {
      void ctx.discussion.getDiscussionById.invalidate({
        id: props.comment.discussionId ? props.comment.discussionId : undefined,
      });
    }
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
                parentId: props.comment.parentId || undefined,
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
