import clsx from "clsx";
import * as React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, name, error, type, ...props }, ref) => {
    return (
      <div className="grid w-full max-w-md items-center gap-1.5 text-base">
        {(label || error) && (
          <div className="flex items-center gap-2 text-xl">
            {label && <label htmlFor={name}>{label}</label>}
            {error && (
              <span className="font-semibold text-rose-600" role="alert">
                {" "}
                - pole wymagane
              </span>
            )}
          </div>
        )}

        <input
          type={type}
          className={clsx(
            "border-input ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring border-dark/30 text-dark flex h-10 w-full rounded-md border bg-primary px-3 py-2 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-primary-800",
            className
          )}
          ref={ref}
          name={name}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
