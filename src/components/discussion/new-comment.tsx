import type { Attachment } from "@prisma/client";
import React, { useEffect, useRef, useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { useSession } from "next-auth/react";
import { api } from "../../lib/utils/api";
import {
  IconPaperclip,
  IconPhoto,
  IconSend,
  IconSquareRoundedX,
  IconX,
} from "@tabler/icons-react";
import { uploadFile } from "../../server/uploadFile";
import { getAttachmentSrc } from "../../lib/utils/getImageSrc";
import LoadingSpinner from "../ui/loading-spinner";
import { type NewCommentTarget } from "../../pages/discussion/[id]";
import useIsInViewport from "../../hooks/useIsInViewport";
import { cn } from "../../lib/utils/cn";
import { IconMessageForward } from "@tabler/icons-react";
import { IconSquareRoundedArrowRight } from "@tabler/icons-react";
import AttachmentPreview from "../ui/attachment-preview";

export type NewCommentProps = NewCommentTarget & {
  discussionId: string;
};

const NewComment = (props: NewCommentProps) => {
  const [commentValue, setCommentValue] = useState("");
  const commentMutation = api.discussion.commentDiscussion.useMutation();
  const { mutateAsync: createPresignedAttachmentUrl } =
    api.files.createPresignedAttachmentUrl.useMutation();
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const session = useSession();
  const ctx = api.useContext();
  const commentRef = useRef<HTMLDivElement | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const isInViewport = useIsInViewport(commentRef);

  const expand = () => setIsExpanded(true);
  const shrink = () => setIsExpanded(false);

  useEffect(() => {
    textAreaRef.current?.focus();
  }, []);

  if (!session.data?.user)
    return <div className="p-2 font-bold">nie zalogowany</div>;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    expand();
    const inputFile = e.currentTarget.files?.[0];
    if (inputFile) setAttachedFile(inputFile);
  };

  const handleDeleteAttachment = () => {
    setAttachedFile(null);
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
      parendId: props.parentId,
      replyToId: props.replyTo?.id,
      attachmentData: attachmentData || undefined,
    });
    setCommentValue("");
    if (props.parentId) {
      void ctx.discussion.getCommentChildrens.invalidate({
        commentId: props.parentId,
      });
    } else {
      void ctx.discussion.getDiscussionById.invalidate({
        id: props.discussionId,
      });
    }
  };

  return (
    <div
      className={cn(
        "h-18 fixed bottom-0 z-10 flex w-full max-w-screen-xl gap-2 rounded-t-md border-t border-primary/20 bg-primary px-2 py-1 transition-all dark:bg-secondary-950",
        isExpanded && "h-28 transition-all"
      )}
    >
      {/* <div className="flex items-center text-primary-950 dark:text-primary">
        
        <div>
          <span className="text-primary/60">Odpowiadasz </span>
          <span>
            {props.replyTo ? props.replyTo.author.name : "w dyskusji"}
          </span>
        </div>
      </div> */}
      <div className="flex w-full flex-col text-sm">
        {isExpanded && (
          <div className="mb-auto flex items-center py-1 transition-all">
            {props.replyTo ? (
              <div className="flex items-center gap-1">
                <button className="m-0 p-0 ">
                  <IconX className="h-4 w-4" />
                </button>
                {props.replyTo.author.name}
              </div>
            ) : (
              "Komentarz"
            )}
          </div>
        )}
        <Textarea
          className={"h-full min-h-[40px]"}
          ref={textAreaRef}
          placeholder="treść"
          value={commentValue}
          onChange={(e) => setCommentValue(e.target.value)}
          rows={1}
          onFocus={expand}
          onBlur={() => {
            if (commentValue === "" && attachedFile === null) shrink();
          }}
        />
        <div className="pt-2">
          {attachedFile && (
            <div className="flex items-center gap-4">
              <AttachmentPreview
                name={attachedFile.name}
                type={attachedFile.type}
                url={
                  attachedFile.type.startsWith("image/")
                    ? URL.createObjectURL(attachedFile)
                    : ""
                }
              />
              <Button
                onClick={handleDeleteAttachment}
                variant="destructive"
                className="px-2"
              >
                <IconX className="h-6 w-6" />
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="mt-auto flex items-center dark:border-gray-600">
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
        <Button
          className="ml-2 p-2"
          variant="default"
          onClick={() => void handleAddComment()}
          disabled={commentMutation.isLoading}
        >
          {commentMutation.isLoading ? (
            <div className="relative h-12 w-12">
              <LoadingSpinner />
            </div>
          ) : (
            <IconSquareRoundedArrowRight />
          )}
        </Button>
      </div>
    </div>
  );
};

export default NewComment;
