import { ReactionType } from "@prisma/client";
import React, { useState, useMemo } from "react";
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
import CurrentUserOnly from "../current-user-only";
import { cn } from "../../lib/utils/cn";
import { type NewCommentTarget } from "./comment-section";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useSession } from "next-auth/react";
import { useReportFormStore } from "../../zustand/report-form-store";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

type Reaction = (typeof ReactionType)[keyof typeof ReactionType];

const reactionsData = {
  [ReactionType.LIKE]: {
    icon: <IconThumbUp />,
    tooltip: "Podoba mi się",
  },
  [ReactionType.DISLIKE]: {
    icon: <IconThumbDown />,
    tooltip: "Nie podoba mi się",
  },
  [ReactionType.HELPFUL]: {
    icon: <IconBulb />,
    tooltip: "Pomocne",
  },
};

export type ReplyTo =
  RouterOutputs["comment"]["getComments"][number]["replyTo"];

type Comment =
  RouterOutputs["comment"]["getComments"][number]["childrens"][number];

type CommentProps = {
  comment: Comment;
  setNewCommentProps: (props: NewCommentTarget) => void;
};
const Comment = (props: CommentProps) => {
  const attachment = props.comment.attachment[0];
  const [isLoading, setIsLoading] = useState(false);
  const { mutateAsync: deleteComment } =
    api.comment.deleteComment.useMutation();
  const session = useSession();
  const reactToCommentMutation = api.comment.reactToComment.useMutation();
  const ctx = api.useContext();
  const { newReport } = useReportFormStore((store) => store);
  const handleDeleteComment = async () => {
    setIsLoading(true);
    await deleteComment({ commentId: props.comment.id });
    void (await ctx.comment.getComments.invalidate({
      catchId: props.comment.catchId || undefined,
      discussionId: props.comment.discussionId || undefined,
    }));
    setIsLoading(false);
  };
  const handleReactToComment = async (reactionType: Reaction) => {
    if (session.status === "unauthenticated") return;
    void (await reactToCommentMutation.mutateAsync({
      commentId: props.comment.id,
      reactionType,
    }));
    void ctx.comment.getComments.invalidate({
      catchId: props.comment.catchId || undefined,
      discussionId: props.comment.discussionId || undefined,
    });
  };
  const reactions = useMemo(() => {
    const reactionsTemplate: Record<
      ReactionType,
      typeof props.comment.reactions
    > = {
      LIKE: [],
      DISLIKE: [],
      HELPFUL: [],
    };
    const reactions = props.comment.reactions.reduce((acc, reaction) => {
      acc[reaction.type].push(reaction);
      return acc;
    }, reactionsTemplate);

    return reactions;
  }, [props]);

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
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="">
                <IconDots />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              className="flex w-40 flex-col gap-1 p-2"
            >
              <Button
                size="sm"
                variant="outline"
                onClick={() => newReport("COMMENT", props.comment.id)}
                className=""
              >
                Zgłoś
              </Button>
              <CurrentUserOnly userId={props.comment.author.id}>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => void handleDeleteComment()}
                >
                  Usuń
                </Button>
              </CurrentUserOnly>
            </PopoverContent>
          </Popover>
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
          <div
            className={cn(
              "flex gap-2 rounded-md px-2 text-sm",
              reactToCommentMutation.isLoading && "pointer-events-none"
            )}
          >
            {Object.entries(reactions).map(([key, reactions]) => {
              const isActive = reactions.some(
                (reaction) => reaction.authorId === session.data?.user.id
              );
              return (
                <TooltipProvider delayDuration={100} key={key}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-1">
                        <span>{reactions.length}</span>
                        <button
                          onClick={() =>
                            void handleReactToComment(key as ReactionType)
                          }
                          className={cn(
                            "flex items-center gap-1 rounded-full bg-transparent p-2 transition-all dark:hover:bg-primary-dark",
                            isActive && "bg-primary-300 dark:bg-primary-800"
                          )}
                        >
                          {reactionsData[key as ReactionType].icon}
                        </button>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      {reactionsData[key as ReactionType].tooltip}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Comment;
