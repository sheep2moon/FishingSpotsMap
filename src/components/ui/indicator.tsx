import React from "react";
import { cn } from "../../lib/utils/cn";

const Indicator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props) => {
  return (
    <div
      {...props}
      className={cn(
        "flex aspect-square w-8 items-center justify-center rounded-full bg-primary-dark/20 text-primary-950 dark:bg-primary/30 dark:text-primary",
        props.className
      )}
    >
      {props.children}
    </div>
  );
});

Indicator.displayName = "Indicator";

export default Indicator;
