import { Attachment, type Comment } from "@prisma/client";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useSession } from "next-auth/react";
import { api } from "../../lib/utils/api";
import { IconPaperclip, IconPhoto } from "@tabler/icons-react";
import { uploadFile } from "../../server/uploadFile";
import { getAttachmentSrc } from "../../lib/utils/getImageSrc";
import LoadingSpinner from "../ui/loading-spinner";

type NewCommentProps = {
  parentComment?: Comment;
  discussionId: string;
};

const NewComment = (props: NewCommentProps) => {
  const [commentValue, setCommentValue] = useState("");
  const commentMutation = api.discussion.commentDiscussion.useMutation();
  const { mutateAsync: createPresignedAttachmentUrl } =
    api.files.createPresignedAttachmentUrl.useMutation();
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const session = useSession();
  if (!session.data?.user)
    return <div className="p-2 font-bold">nie zalogowany</div>;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const inputFile = e.currentTarget.files?.[0];
    if (inputFile) setAttachedFile(inputFile);
  };

  const handleAddComment = async () => {
    let attachmentData: Pick<
      Attachment,
      "id" | "name" | "type" | "url"
    > | null = null;
    if (attachedFile) {
      const { id, url, fields } = await createPresignedAttachmentUrl({
        fileType: attachedFile.type,
      });
      await uploadFile({ url, fields, file: attachedFile });
      const attachmentUrl = getAttachmentSrc(id);
      attachmentData = {
        id,
        name: attachedFile.name,
        type: attachedFile.type,
        url: attachmentUrl,
      };
    }
    await commentMutation.mutateAsync({
      content: commentValue,
      discussionId: props.discussionId,
      parendId: props.parentComment?.id,
      attachmentData: attachmentData || undefined,
    });
    setCommentValue("");
  };

  return (
    <Card className="">
      <CardContent className="flex flex-col gap-2 px-4 pb-2 pt-6">
        <Textarea
          placeholder="treść"
          value={commentValue}
          onChange={(e) => setCommentValue(e.target.value)}
          rows={5}
        />
        <div className="flex items-center dark:border-gray-600">
          <Button
            variant="secondary"
            onClick={() => void handleAddComment()}
            disabled={commentMutation.isLoading}
          >
            {commentMutation.isLoading ? (
              <div className="relative h-12 w-12">
                <LoadingSpinner />
              </div>
            ) : (
              "Dodaj komentarz"
            )}
          </Button>
          <div className="px-4">{attachedFile && attachedFile.name}</div>
          <div className="ml-auto flex space-x-1 pl-0 sm:pl-2">
            <label htmlFor="attachment-upload" className="flex items-center">
              <input
                className="peer h-0 w-0 opacity-10"
                type="file"
                id="attachment-upload"
                onChange={handleFileChange}
              />
              <div className="aspect-square cursor-pointer rounded-md p-1    ring-primary peer-focus:ring-2 hover:bg-primary-dark">
                <IconPaperclip className="" />
              </div>
              <span className="sr-only">Attach file</span>
            </label>
            <label htmlFor="image-upload" className="flex items-center">
              <input
                className="peer h-0 w-0 opacity-10"
                type="file"
                id="image-upload"
                onChange={handleFileChange}
              />
              <div className="aspect-square cursor-pointer rounded-md p-1    ring-primary peer-focus:ring-2 hover:bg-primary-dark">
                <IconPhoto className="" />
              </div>
              <span className="sr-only">Attach file</span>
            </label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewComment;
