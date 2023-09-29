import React from "react";
import { cn } from "../../lib/utils/cn";
import {
  IconCrown,
  IconHome,
  IconListSearch,
  IconLogout,
  IconMapPinPlus,
  IconMenu2,
  IconSettings,
  IconUserCircle,
} from "@tabler/icons-react";
import { IconMap2 } from "@tabler/icons-react";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import SearchSpots from "./search-spots";
import Image from "next/image";
import { InternalLink } from "../ui/internal-link";
import { signOut, useSession } from "next-auth/react";
import ThemeToggle from "../../layout/ThemeToggle";
import NotAuthOnly from "../not-auth-only";
import AuthOnly from "../auth-only";
import NotificationsPopover from "./notifications-popover";

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
        "duration-400 fixed inset-x-0 top-0 z-[1000] mx-auto flex h-14 w-screen  items-center bg-primary-100 py-2 text-primary-dark shadow-md shadow-primary-700/50 transition-all dark:bg-primary-950 dark:text-primary"
      )}
    >
      <nav className="mx-auto flex w-full max-w-screen-xl items-center px-2">
        <div className="lg:hidden">
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
                    <span className="text-lg">{link.text}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="hidden lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="p-2 dark:text-primary/80 dark:hover:text-primary"
            >
              {link.text}
            </Link>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-2 p-2 pr-4">
          <ThemeToggle />
          <SearchSpots />
          <AuthOnly>
            <NotificationsPopover />
          </AuthOnly>
          {session.data?.user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button>
                  <Image
                    alt=""
                    src={session.data.user.image || ""}
                    className="rounded-full"
                    width={36}
                    height={36}
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="z-[1001] w-52" align="end">
                <DropdownMenuLabel className="text-center">
                  {session.data.user.email}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <InternalLink
                      className="w-full justify-start"
                      variant="ghost"
                      href="/user/profile"
                    >
                      <IconUserCircle />
                      Mój profil
                    </InternalLink>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <InternalLink
                      className="w-full justify-start"
                      variant="ghost"
                      href="/"
                    >
                      <IconSettings />
                      Preferencje
                    </InternalLink>
                  </DropdownMenuItem>
                  {session.data.user.role === "MODERATOR" && (
                    <>
                      <DropdownMenuItem asChild>
                        <InternalLink
                          href="/"
                          className="w-full justify-start"
                          variant="ghost"
                        >
                          <IconCrown size="1.6rem" className="text-accent" />{" "}
                          Moderator
                        </InternalLink>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuGroup>
                <DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Button
                      className="w-full justify-start"
                      onClick={() => void signOut()}
                      variant="ghost"
                    >
                      <IconLogout />
                      Wyloguj
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <NotAuthOnly>
            <InternalLink href="/auth/signin">Zaloguj</InternalLink>
          </NotAuthOnly>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
