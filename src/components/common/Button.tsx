import clsx from "clsx";
import React from "react";
import LoadingSpinner from "./LoadingSpinner";

type ButtonProps = {
  isLoading?: boolean;
  variant?: "filled" | "secondary" | "outline" | "minimal";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  children,
  className,
  isLoading = false,
  variant = "filled",
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      disabled={isLoading}
      className={clsx(
        "flex items-center justify-center rounded-sm px-1 text-base transition duration-200 disabled:opacity-50",
        {
          "text-dark dark:bg-dark dark:text-light rounded-lg bg-secondary px-4 py-2 text-sm font-medium ring-2 ring-secondary focus:outline-none focus:ring-4 focus:ring-secondary dark:bg-primary-dark dark:hover:bg-primary-950 dark:focus:ring-secondary":
            variant === "filled",
          "dark:text-dark dark:secondary-300  border border-secondary bg-secondary-200/30 px-4 py-2 text-center text-primary-dark hover:bg-secondary-200/70 focus:outline-none focus:ring-2 focus:ring-secondary dark:bg-secondary dark:text-primary  dark:hover:bg-secondary-500 dark:hover:text-primary-200 dark:focus:ring-indigo-900":
            variant === "secondary",
          "hover:text-dark dark:hover:text-dark rounded-lg border border-secondary px-5 py-2.5 text-center text-sm font-medium text-secondary hover:bg-secondary focus:outline-none focus:ring-4 focus:ring-secondary dark:border-secondary dark:text-secondary  dark:hover:bg-secondary dark:focus:ring-secondary":
            variant === "outline",
          "shadow-dark aashadow-md rounded-md bg-primary px-3 py-2 text-center text-sm text-secondary hover:outline hover:outline-secondary/20":
            variant === "minimal",
        },
        className
      )}
    >
      {isLoading ? (
        <div className="h-full` relative aspect-square">
          <LoadingSpinner />{" "}
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
