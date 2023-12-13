import React from "react";
import { cn } from "../../lib/utils/cn";

type TimeBadgeProps = React.HTMLAttributes<HTMLDivElement> & {
  date: Date;
};

const TimeBadge = ({ date, className, ...props }: TimeBadgeProps) => {
  const formatDate = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // +1 because months are 0-indexed
    const year = date.getFullYear().toString().substr(-2); // Get last two digits of the year
    return `${day}-${month}-${year}`;
  };

  return (
    <div
      className={cn(
        "flex w-fit items-center justify-center rounded-md px-1.5 py-0.5 text-xs dark:bg-primary-950 dark:text-primary-400",
        className
      )}
      {...props}
    >
      {formatDate(date)}
    </div>
  );
};

export default TimeBadge;
