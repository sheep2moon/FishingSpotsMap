import React from "react";
import { Button } from "../ui/button";
import { IconBrandGithubFilled } from "@tabler/icons-react";

const Footer = () => {
  return (
    <footer className="mt-auto w-screen p-2 dark:bg-primary-950 dark:text-primary xl:rounded-md">
      <div className="mx-auto flex w-full max-w-screen-xl items-center text-xs">
        <span className="flex items-center">
          aplikacja stworzona przez
          <a
            className="ml-2 flex underline"
            href="https://github.com/sheep2moon"
            target="_blank"
          >
            <IconBrandGithubFilled className="text-primary-600 dark:text-primary" />
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
