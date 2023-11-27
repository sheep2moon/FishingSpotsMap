import React, { useState } from "react";
import { cn } from "../../lib/utils/cn";
import { IconPaperclip } from "@tabler/icons-react";

type AttachmentInputProps = {
  onAttachmentAdd: (files: File[]) => void;
};

const AttachmentInput = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & AttachmentInputProps
>(({ onAttachmentAdd, className, ...props }, ref) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const fileList = e.currentTarget.files;

    if (fileList) {
      const files: File[] = Array.from(fileList);
      onAttachmentAdd(files);
    }
  };

  return (
    <div
      className={cn(
        "relative h-10 w-full max-w-[240px] rounded-md border border-primary-400/40 transition-all hover:border-primary/30 dark:border-primary/20 lg:max-w-xs",
        className
      )}
      {...props}
      ref={ref}
    >
      <label
        htmlFor="attachmentInput"
        className="w- absolute inset-0 flex cursor-pointer items-center justify-center gap-2"
      >
        <input
          multiple
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
