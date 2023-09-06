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
          "rounded-lg bg-secondary px-5 py-3 text-sm font-medium text-dark hover:bg-black focus:outline-none focus:ring-4 focus:ring-secondary dark:bg-dark dark:text-light dark:focus:ring-secondary":
            variant === "filled",
          "font-base rounded-lg border border-accent/50 px-5 py-2.5 text-center text-base text-purple-700 hover:bg-purple-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-purple-300 dark:border-accent/80 dark:bg-accent dark:text-dark dark:hover:bg-accent dark:hover:text-white dark:focus:ring-indigo-900":
            variant === "secondary",
          "rounded-lg border border-secondary px-5 py-2.5 text-center text-sm font-medium text-secondary hover:bg-secondary hover:text-dark focus:outline-none focus:ring-4 focus:ring-secondary dark:border-secondary dark:text-secondary dark:hover:bg-secondary  dark:hover:text-dark dark:focus:ring-secondary":
            variant === "outline",
          "rounded-md bg-primary px-3 py-2 text-center text-sm text-secondary shadow-md shadow-dark hover:outline hover:outline-secondary/20":
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
