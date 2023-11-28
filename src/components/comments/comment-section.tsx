import { useAutoAnimate } from "@formkit/auto-animate/react";
import React, { useState } from "react";
import Comment, { type ReplyTo } from "./comment";
import NewComment from "./new-comment";
import { type RouterInputs, api } from "../../lib/utils/api";
import { loadingArray } from "../../lib/utils/helpers";
import { count } from "console";
import { Skeleton } from "../ui/skeleton";

type CommentSectionProps = {
  targetId: string;
  count: number;
  targetType: RouterInputs["comment"]["createComment"]["targetType"];
  sortingKey: RouterInputs["comment"]["getComments"]["orderBy"];
};

export type NewCommentTarget = {
  replyTo?: ReplyTo;
  parentId?: string;
};

const CommentSection = (props: CommentSectionProps) => {
  const [commentsContainer] = useAutoAnimate();
  const [childCommentsContainer] = useAutoAnimate();

  const commentsQuery = api.comment.getComments.useQuery({
    discussionId:
      props.targetType === "DISCUSSION" ? props.targetId : undefined,
    catchId: props.targetType === "CATCH" ? props.targetId : undefined,
    orderBy: props.sortingKey,
  });
  const [newCommentProps, setNewCommentProps] = useState<NewCommentTarget>({
    parentId: undefined,
    replyTo: undefined,
  });

  return (
    <>
      <div className="mt-8 flex flex-col gap-2" ref={commentsContainer}>
        <div className="flex flex-col">
          {commentsQuery.data ? (
            commentsQuery.data.map((comment) => (
              <div key={comment.id}>
                <Comment
                  setNewCommentProps={setNewCommentProps}
                  comment={comment}
                />
                {comment.childrens && (
                  <div
                    ref={childCommentsContainer}
                    className="ml-4 flex flex-col gap-2 border-l-2 border-primary-dark/20 pl-2 dark:border-primary"
                  >
                    {comment.childrens.map((childComment) => (
                      <Comment
                        key={childComment.id}
                        comment={childComment}
                        setNewCommentProps={setNewCommentProps}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <>
              {loadingArray(props.count).map((_, index) => (
                <div
                  key={`skeleton-${index}`}
                  className="mt-4 flex flex-col rounded-md bg-primary-dark/40 p-2"
                >
                  <div className="flex items-center gap-4">
                    <Skeleton className="aspect-square w-12 rounded-full " />
                    <Skeleton className="h-10 w-44" />
                    <Skeleton className="ml-auto h-8 w-28" />
                  </div>
                  <Skeleton className="mt-2 h-40 w-full" />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      <NewComment
        setNewCommentProps={setNewCommentProps}
        {...newCommentProps}
        targetId={props.targetId}
        targetType={props.targetType}
      />
    </>
  );
};

export default CommentSection;
