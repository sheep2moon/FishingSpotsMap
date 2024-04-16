import type { Attachment } from "@prisma/client";
import React, { useEffect, useRef, useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { type RouterInputs, api } from "../../lib/utils/api";
import {
  IconLoader,
  IconPaperclip,
  IconPhoto,
  IconX,
} from "@tabler/icons-react";
import { uploadFile } from "../../server/uploadFile";
import { getAttachmentSrc } from "../../lib/utils/getImageSrc";
import LoadingSpinner from "../ui/loading-view";
import { cn } from "../../lib/utils/cn";
import { IconSquareRoundedArrowRight } from "@tabler/icons-react";
import { type NewCommentTarget } from "./comment-section";
import LoginButton from "../ui/login-button";

export type NewCommentProps = NewCommentTarget & {
  targetType: RouterInputs["comment"]["createComment"]["targetType"];
  targetId: string;
  setNewCommentProps: (props: NewCommentTarget) => void;
};

const NewComment = (props: NewCommentProps) => {
  const [commentValue, setCommentValue] = useState("");
  const commentMutation = api.comment.createComment.useMutation();
  const { mutateAsync: createPresignedAttachmentUrl } =
    api.files.createPresignedAttachmentUrl.useMutation();
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const session = useSession();
  const newCommentRef = useRef<HTMLDivElement | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const ctx = api.useContext();
  useEffect(() => {
    textAreaRef.current?.focus();
  }, []);

  React.useEffect(() => {
    const textArea = textAreaRef.current;
    if (textArea) {
      textArea.style.height = "38px";
      const newHeight = Math.min(textArea.scrollHeight, 300);
      textArea.style.height = newHeight.toString() + "px";
    }
  }, [commentValue]);

  if (!session.data?.user)
    return (
      <div
        ref={newCommentRef}
        className={cn(
          "fixed bottom-0 left-1/2 z-10 flex w-full max-w-screen-xl -translate-x-1/2 gap-2 rounded-t-md border border-b-0 border-primary/20 border-secondary-900 bg-primary p-1 transition-all dark:bg-secondary-950"
        )}
      >
        <div className="flex w-full items-center justify-center gap-8 p-1 font-bold">
          <span>Aby dodawać komentarze musisz być zalogowany.</span>
          <LoginButton />
        </div>
      </div>
    );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
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
      targetType: props.targetType,
      targetId: props.targetId,
      parendId: props.parentId,
      replyToId: props.replyTo?.id,
      attachmentData: attachmentData || undefined,
    });
    setCommentValue("");
    setAttachedFile(null);
    props.setNewCommentProps({ parentId: undefined, replyTo: undefined });
    void (await ctx.comment.getComments.invalidate({
      discussionId:
        props.targetType === "DISCUSSION" ? props.targetId : undefined,
      catchId: props.targetType === "CATCH" ? props.targetId : undefined,
    }));
  };

  return (
    <div
      ref={newCommentRef}
      className={cn(
        "fixed bottom-0 left-1/2 z-10 flex w-full max-w-screen-xl -translate-x-1/2 gap-2 rounded-t-md border border-b-0 border-primary/20 bg-primary px-2 py-2 transition-all dark:bg-primary-dark"
      )}
    >
      <div className="flex w-full flex-col text-sm">
        <div className="mb-1 flex items-center justify-between gap-8 pl-1.5">
          <div className="flex items-center gap-1">
            {props.replyTo && (
              <button
                className="m-0 p-0"
                onClick={() =>
                  props.setNewCommentProps({
                    parentId: undefined,
                    replyTo: undefined,
                  })
                }
              >
                <IconX className="h-4 w-4" />
              </button>
            )}
            {props.replyTo ? (
              <div className="">
                <span>Odpowiadasz</span>
                <span className="ml-1.5 text-sky-300">
                  @{props.replyTo.author.name || ""}
                </span>
              </div>
            ) : (
              <span className="whitespace-nowrap">Dodaj komentarz</span>
            )}
          </div>
          {attachedFile && (
            <div className="flex items-center gap-2">
              <IconPaperclip className="h-4 w-4" />
              <p className="line-clamp-1">{attachedFile.name}</p>
              <button
                onClick={handleDeleteAttachment}
                className="grid h-5 w-5 place-items-center rounded-sm bg-rose-900/60"
              >
                <IconX className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
        <Textarea
          className={"scroll m-1 h-full min-h-[38px] resize-none"}
          ref={textAreaRef}
          placeholder="treść"
          value={commentValue}
          onChange={(e) => setCommentValue(e.target.value)}
        />
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
          <span className="sr-only">Dołącz plik</span>
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
          <span className="sr-only">Dołącz plik</span>
        </label>
        <Button
          className="ml-2 px-2 sm:px-4"
          variant="default"
          onClick={() => void handleAddComment()}
          disabled={commentMutation.isLoading}
        >
          <span className="text-base">Dodaj</span>
          {commentMutation.isLoading ? (
            <IconLoader className="animate-spin" />
          ) : (
            <IconSquareRoundedArrowRight />
          )}
        </Button>
      </div>
    </div>
  );
};

export default NewComment;
