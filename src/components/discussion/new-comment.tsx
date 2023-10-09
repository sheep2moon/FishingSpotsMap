import { type Comment } from "@prisma/client";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useSession } from "next-auth/react";
import { api } from "../../lib/utils/api";

type NewCommentProps = {
  parentComment?: Comment;
  discussionId: string;
};

const NewComment = (props: NewCommentProps) => {
  const [commentValue, setCommentValue] = useState("");
  const commentMutation = api.discussion.commentDiscussion.useMutation();
  const session = useSession();
  if (!session.data?.user)
    return <div className="p-2 font-bold">nie zalogowany</div>;

  const handleAddComment = async () => {
    await commentMutation.mutateAsync({
      content: commentValue,
      discussionId: props.discussionId,
      parendId: props.parentComment?.id,
    });
    setCommentValue("");
  };

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Nowy komentarz</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Textarea
          placeholder="treść"
          value={commentValue}
          onChange={(e) => setCommentValue(e.target.value)}
          rows={5}
        />
        <Button
          onClick={() => void handleAddComment()}
          disabled={commentMutation.isLoading}
          className="ml-auto"
        >
          Dodaj komentarz
        </Button>
      </CardContent>
    </Card>
  );
};

export default NewComment;
