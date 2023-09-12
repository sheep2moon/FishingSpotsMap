import clsx from "clsx";
import React, { type ReactNode } from "react";

const HorizontalLine = ({
  children,
  className = "",
}: {
  children?: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={clsx(
        "inline-flex w-full items-center justify-center ",
        className
      )}
    >
      <hr className=" h-[2px] w-full border-0 bg-secondary/30" />
      {children && (
        <span className="text-dark block w-fit whitespace-nowrap px-3 font-medium dark:text-indigo-100">
          {children}
        </span>
      )}
      <hr className=" h-[2px] w-full border-0 bg-secondary/30" />
    </div>
  );
};

export default HorizontalLine;
