import React from "react";
import { cn } from "../../lib/utils/cn";
import { IconHash } from "@tabler/icons-react";

type TagProps = {
  tagName: string;
};

const Tag = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & TagProps
>(({ tagName, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex w-fit items-center gap-2 rounded-md border px-2 py-1 text-base dark:border-primary/20",
        className
      )}
      {...props}
    >
      <IconHash />
      {tagName}
    </div>
  );
});

Tag.displayName = "Tag";

export default Tag;
