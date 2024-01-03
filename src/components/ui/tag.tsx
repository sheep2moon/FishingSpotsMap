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
        "flex w-fit items-center gap-0.5 rounded-md px-2 py-1 text-sm text-primary-700 dark:text-primary-300",
        className
      )}
      {...props}
    >
      <IconHash className="h-5 w-5" />
      {tagName}
    </div>
  );
});

Tag.displayName = "Tag";

export default Tag;
