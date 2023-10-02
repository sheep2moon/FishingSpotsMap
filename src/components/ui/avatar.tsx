import React from "react";
import { cn } from "../../lib/utils/cn";
import Image from "next/image";

type AvatarProps = {
  imageSrc: string | File;
};

const Avatar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & AvatarProps
>(({ imageSrc, className, ...props }, ref) => {
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
