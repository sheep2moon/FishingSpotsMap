import React, { useState } from "react";
import { cn } from "../../lib/utils/cn";
import { IconPaperclip } from "@tabler/icons-react";

type AttachmentInputProps = {
  onAttachmentAdd: (file: File) => void;
};

const AttachmentInput = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & AttachmentInputProps
>(({ onAttachmentAdd, className, ...props }, ref) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const inputFile = e.currentTarget.files?.[0];
    if (inputFile) onAttachmentAdd(inputFile);
  };

  return (
    <div
      className={cn(
        "relative aspect-square max-w-[10rem] rounded-md dark:bg-primary-dark",
        className
      )}
      {...props}
      ref={ref}
    >
      <label
        htmlFor="attachmentInput"
        className="absolute inset-0 flex items-center justify-center"
      >
        <input
          className="w-0 opacity-0"
          type="file"
          id="attachmentInput"
          onChange={handleFileChange}
        />
        <span>Załącz plik</span>
        <IconPaperclip />
      </label>
    </div>
  );
});

AttachmentInput.displayName = "AttachmentInput";

export default AttachmentInput;
