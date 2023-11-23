import React from "react";

type TimeBadgeProps = {
  date: Date;
};

const TimeBadge = ({ date }: TimeBadgeProps) => {
  const formatDate = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // +1 because months are 0-indexed
    const year = date.getFullYear().toString().substr(-2); // Get last two digits of the year
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="w-fit rounded-md px-2 py-1 text-xs dark:bg-primary-500/20">
      {formatDate(date)}
    </div>
  );
};

export default TimeBadge;
