import React from "react";
import { cn } from "../../lib/utils/cn";
import Image from "next/image";
import { IconFileTypePdf, IconFileTypeTxt } from "@tabler/icons-react";

type AttachmentPreviewProps = {
  type: string;
  url: string;
  name: string;
  downloadable?: boolean;
};

const AttachmentPreview = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & AttachmentPreviewProps
>(({ type, url, name, downloadable = false, className, ...props }, ref) => {
  return (
    <div
      {...props}
      ref={ref}
      className={cn("flex items-center gap-2", className)}
    >
      <div className="relative flex aspect-square w-12 items-center justify-center rounded-md dark:bg-primary-dark">
        {type.startsWith("image/") && (
          <Image className="object-cover" src={url} alt={name} fill />
        )}
        {type.startsWith("application/pdf") && (
          <IconFileTypePdf size="2.2rem" />
        )}
        {type.startsWith("text") && <IconFileTypeTxt size="2.2rem" />}
      </div>
      <div className="group flex flex-col text-sm font-bold">
        {name}
        {downloadable && (
          <a
            download
            href={url}
            className="cursor-pointer font-normal group-hover:text-accent"
          >
            Pobierz
          </a>
        )}
      </div>
    </div>
  );
});

AttachmentPreview.displayName = "AttachmentPreview";

export default AttachmentPreview;
