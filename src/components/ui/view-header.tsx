import React from "react";
import { cn } from "../../lib/utils/cn";

const ViewHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col items-center space-y-4 p-6", className)}
    {...props}
  />
));
ViewHeader.displayName = "ViewHeader";

const ViewTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "flex items-center gap-2 font-dosis text-4xl font-light uppercase leading-none tracking-wider",
      className
    )}
    {...props}
  />
));
ViewTitle.displayName = "ViewTitle";

const ViewSubtitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      "text-center text-primary-500 dark:text-primary-400",
      className
    )}
    {...props}
  />
));
ViewSubtitle.displayName = "ViewSubtitle";

export { ViewHeader, ViewTitle, ViewSubtitle };
