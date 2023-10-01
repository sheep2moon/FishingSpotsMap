import Image, { StaticImageData } from "next/image";
import React from "react";
import { cn } from "../../lib/utils/cn";

type BadgeTemplateProps = {
  level: 1 | 2 | 3;
  icon: StaticImageData;
  achieved: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const BadgeTemplate = ({
  level,
  icon,
  achieved,
  ...props
}: BadgeTemplateProps) => {
  return (
    <div
      className={cn("relative aspect-square w-24", !achieved && "grayscale")}
      {...props}
    >
      <Image src="/images/achievements/achievement-bg.svg" fill alt="" />
      <div className="relative mx-auto my-auto aspect-square h-full w-1/2">
        <Image src={icon} fill alt="" className="" />
      </div>
      {level === 1 && (
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
          <BadgeLevel />
        </div>
      )}
      {level === 2 && (
        <div className="absolute -bottom-3 left-1/2 flex -translate-x-1/2">
          <BadgeLevel className="-mx-0.5" />
          <BadgeLevel className="-mx-0.5" />
        </div>
      )}
      {level === 3 && (
        <div className="absolute -bottom-3 left-1/2 flex -translate-x-1/2">
          <BadgeLevel className="-mx-1 -mt-1" />
          <BadgeLevel className="z-10 -mx-1" />
          <BadgeLevel className="-mx-1 -mt-1" />
        </div>
      )}
    </div>
  );
};

export default BadgeTemplate;

const BadgeLevel = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("relative aspect-square h-7", className)} {...props}>
      <Image src="/images/achievements/achievement-star.svg" fill alt="" />
    </div>
  );
};
