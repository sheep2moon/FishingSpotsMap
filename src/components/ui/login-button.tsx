import {
  IconBrandDiscordFilled,
  IconBrandGoogleFilled,
} from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

type LoginButtonProps = {
  text?: string;
};

const LoginButton = ({ text = "Zaloguj się" }: LoginButtonProps) => {
  return (
    <Link
      href="/auth/signin"
      className="relative inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary-dark px-4 py-4 text-base font-bold text-primary ring-offset-white transition-colors hover:bg-primary-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:bg-primary-50 dark:text-primary-900 dark:ring-offset-primary-950 dark:hover:bg-primary-50/90 dark:focus-visible:ring-primary-300"
    >
      {text}
      <div className="flex items-center gap-1">
        <IconBrandDiscordFilled className="" />
        <IconBrandGoogleFilled className="" />
      </div>
    </Link>
  );
};

export default LoginButton;
