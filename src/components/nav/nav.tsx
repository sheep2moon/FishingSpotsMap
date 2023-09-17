import React from "react";
import { cn } from "../../lib/utils/cn";
import {
  IconHome,
  IconListSearch,
  IconMapPinPlus,
  IconMenu2,
} from "@tabler/icons-react";
import { IconMap2 } from "@tabler/icons-react";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import SearchSpots from "./search-spots";
import Image from "next/image";
import { InternalLink } from "../ui/internal-link";
import { useSession } from "next-auth/react";

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
  const session = useSession();
  return (
    <header
      className={cn(
        "duration-400 fixed inset-x-0 top-0 z-[1000] mx-auto flex h-14 w-screen  items-center bg-primary-100 py-2 text-primary-dark shadow-md shadow-primary-700/50 transition-all dark:bg-primary-950 dark:text-primary lg:rounded-b-md"
      )}
    >
      <nav className="mx-auto flex w-full max-w-screen-xl items-center px-2">
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
              <DropdownMenuItem key={link.href} asChild>
                <Link
                  href={link.href}
                  className="center flex items-center gap-2 rounded-md p-2 pr-8 dark:text-primary/60 dark:hover:bg-primary/10 dark:hover:text-primary/80"
                >
                  {link.icon}
                  <span>{link.text}</span>
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="ml-auto flex items-center gap-2 p-2 pr-4">
          <SearchSpots />
          {session.data?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button>
                  <Image alt="" src="" />
                  User
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="z-[1001]" align="end">
                <InternalLink href="/">Konto</InternalLink>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <InternalLink href="/auth/signin">Zaloguj</InternalLink>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Nav;
