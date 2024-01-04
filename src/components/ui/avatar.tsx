import React from "react";
import { cn } from "../../lib/utils/cn";
import Image from "next/image";
import { Skeleton } from "./skeleton";

type AvatarProps = {
  imageSrc: string;
};

const Avatar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & AvatarProps
>(({ imageSrc, className, ...props }, ref) => {
  if (!imageSrc) {
    return <Skeleton className={cn("w-12 rounded-full", className)} />;
  }
  return (
    <div
      className={cn(
        "relative aspect-square w-12 rounded-full shadow-sm shadow-primary-500 dark:shadow-primary-600",
        className
      )}
      {...props}
      ref={ref}
    >
      <Image src={imageSrc} alt="" fill className="rounded-full" />
    </div>
  );
});

Avatar.displayName = "Avatar";

export default Avatar;
