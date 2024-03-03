import React from "react";
import { Button } from "../ui/button";
import { IconBrandGithubFilled } from "@tabler/icons-react";
import { useReportFormStore } from "../../zustand/report-form-store";
import { links } from "../nav/nav";
import Link from "next/link";

const Footer = () => {
  const { newReport } = useReportFormStore((store) => store);
  return (
    <footer className="mt-auto flex w-full flex-col items-center gap-5 px-2 pb-6 pt-8 dark:bg-primary-dark dark:text-primary-300 xl:rounded-md">
      <div className="flex divide-x-2 dark:divide-primary-600">
        {links.map((link) => (
          <Link href={link.href} key={link.href} className="px-2">
            {link.text}
          </Link>
        ))}
      </div>
      <div className="mx-auto flex w-full max-w-screen-xl items-center justify-center gap-8 text-xs sm:text-sm">
        <div className="flex items-center">
          <span>Rybook 2024</span>
          <a
            className="ml-2 flex items-center underline"
            href="https://github.com/sheep2moon"
            target="_blank"
          >
            <IconBrandGithubFilled className="w-4 text-primary-600 dark:text-primary" />
            sheep2moon
          </a>
        </div>
        <Button
          onClick={() => newReport("GLOBAL")}
          variant="link"
          className="text-base"
        >
          Zgłoś błąd/sugestie
        </Button>
      </div>
    </footer>
  );
};

export default Footer;
