import { useAutoAnimate } from "@formkit/auto-animate/react";
import React, { useMemo, useState } from "react";
import Indicator from "../ui/indicator";
import Comment, { type ReplyTo } from "./comment";
import NewComment from "./new-comment";
import { type RouterInputs, api } from "../../lib/utils/api";

type CommentSectionProps = {
  targetId: string;
  targetType: RouterInputs["comment"]["createComment"]["targetType"];
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
  });
  const [newCommentProps, setNewCommentProps] = useState<NewCommentTarget>({
    parentId: undefined,
    replyTo: undefined,
  });

  const commentsCount = useMemo(() => {
    const totalCount = commentsQuery.data?.reduce((acc, comment) => {
      return acc + 1 + comment.childrens.length;
    }, 0);
    return totalCount;
  }, [commentsQuery.data]);

  if (!commentsQuery.data) return <>loading...</>;

  return (
    <>
      <div className="mt-8 flex flex-col gap-2" ref={commentsContainer}>
        <h2 className="flex items-center gap-2">
          Komentarze <Indicator>{commentsCount}</Indicator>
        </h2>
        {commentsQuery.data.map((comment) => (
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
        ))}
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
