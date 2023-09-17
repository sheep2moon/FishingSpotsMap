import React, { useEffect, useState } from "react";
import { cn } from "../../lib/utils/cn";
import {
  IconHome,
  IconListSearch,
  IconMapPinPlus,
  IconMenu2,
} from "@tabler/icons-react";
import { IconMap2 } from "@tabler/icons-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import Link from "next/link";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { api } from "../../lib/utils/api";
import useDebounce from "../../hooks/useDebounce";
import { PopoverAnchor } from "@radix-ui/react-popover";
import SearchSpots from "./search-spots";

const links: { text: string; href: string; icon: React.ReactNode }[] = [
  {
    text: "Strona Główna",
    href: "/",
    icon: <IconHome size="1.4rem" />,
  },
  {
    text: "Dodaj miejsce",
    href: "/add-fishing-spot",
    icon: <IconMapPinPlus size="1.4rem" />,
  },
  {
    text: "Mapa miejsc",
    href: "/fishing-spots-map",
    icon: <IconMap2 size="1.4rem" />,
  },
  {
    text: "Lista miejsc",
    href: "/fishing-spot/spot-search",
    icon: <IconListSearch size="1.4rem" />,
  },
];

const Nav = () => {
  return (
    <header
      className={cn(
        "duration-400 fixed inset-x-0 top-0 z-[1000] mx-auto flex h-14 w-screen  items-center bg-primary-100 py-2 text-primary-dark shadow-md shadow-primary-700/50 transition-all dark:bg-primary-950 dark:text-primary lg:rounded-b-md"
      )}
    >
      <nav className="mx-auto flex w-full max-w-screen-xl p-2">
        <div className="place-self-start">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="p-2">
                <IconMenu2 />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="z-[1001] w-fit  space-y-1 p-2"
              align="start"
            >
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="center flex items-center gap-2 rounded-md p-2 pr-8 dark:text-primary/60 dark:hover:bg-primary/10 dark:hover:text-primary/80"
                >
                  {link.icon}
                  <span>{link.text}</span>
                </Link>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="ml-auto flex items-center">
          <SearchSpots />
          <div className="p-2 pr-6">User</div>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
