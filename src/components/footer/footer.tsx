import React from "react";
import { Button } from "../ui/button";
import { IconBrandGithubFilled } from "@tabler/icons-react";

const Footer = () => {
  return (
    <footer className="mt-auto w-full p-2 dark:bg-primary-dark dark:text-primary xl:rounded-md">
      <div className="mx-auto flex w-full max-w-screen-xl items-center text-xs sm:text-sm">
        <span className="flex items-center">
          <a
            className="ml-2 flex items-center underline"
            href="https://github.com/sheep2moon"
            target="_blank"
          >
            <IconBrandGithubFilled className="w-4 text-primary-600 dark:text-primary" />
            sheep2moon
          </a>
        </span>
        <Button variant="outline" className="ml-auto">
          Zgłoś błąd/sugestie
        </Button>
      </div>
    </footer>
  );
};

export default Footer;
