import * as React from "react";
import { cn } from "../../lib/utils/cn";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <div className="absolute left-2 top-1/2 -translate-y-1/2">
          {props.icon}
        </div>
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-primary-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-primary-800 dark:bg-primary-950 dark:ring-offset-primary-950 dark:placeholder:text-primary-400 dark:focus-visible:ring-primary-300",
            className,
            props.icon && "pl-10"
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
