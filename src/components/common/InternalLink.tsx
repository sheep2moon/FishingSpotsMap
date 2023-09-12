import clsx from "clsx";
import type { LinkProps } from "next/link";
import Link from "next/link";
import React, { HTMLAttributes } from "react";

type InternalLinkProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
} & LinkProps &
  HTMLAttributes<HTMLAnchorElement>;

const InternalLink = ({
  variant = "primary",
  children,
  className,
  ...rest
}: InternalLinkProps) => {
  return (
    <Link
      {...rest}
      className={clsx(
        "flex items-center gap-2 rounded-sm border px-4 py-2.5 transition-all",
        {
          "border-secondary bg-primary dark:bg-primary-950":
            variant === "primary",
          "border-2 border-secondary bg-primary font-bold text-secondary-700 hover:bg-secondary-50 hover:shadow-sm hover:shadow-secondary":
            variant === "secondary",
        },
        className
      )}
    >
      {children}
    </Link>
  );
};

export default InternalLink;
