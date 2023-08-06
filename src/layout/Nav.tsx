"use client";
import { Menu, Transition } from "@headlessui/react";
import { IconMap2 } from "@tabler/icons-react";
import { IconMapPinPlus } from "@tabler/icons-react";
import { IconHome, IconMenu2 } from "@tabler/icons-react";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";

const links: { text: string; href: string; icon: React.ReactNode }[] = [
  {
    text: "Strona Główna",
    href: "/",
    icon: <IconHome />,
  },
  {
    text: "Dodaj miejsce",
    href: "/add-fishing-spot",
    icon: <IconMapPinPlus />,
  },
  {
    text: "Mapa miejsc",
    href: "/fishing-spots-map",
    icon: <IconMap2 />,
  },
];

const Nav = () => {
  const session = useSession();
  // const [scrollPosition, setScrollPosition] = useState(0);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setScrollPosition(window.scrollY);
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);
  return (
    <header
      className={clsx(
        "duration-400 fixed inset-x-0 top-0 z-[999999] mt-2 flex items-center text-light transition-all"
        // {
        //   "bg-opacity-0": scrollPosition === 0,
        //   "bg-opacity-70": scrollPosition > 0,
        // }
      )}
    >
      <Menu as="div" className="relative ml-2">
        <div className="grid place-items-center rounded-full bg-dark p-2 text-xl">
          <Menu.Button>
            <IconMenu2 className="" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute mt-2 w-52 ">
            <div className="flex flex-col gap-2 rounded-md border-2 border-dark/20 bg-light px-1 py-2  text-lg text-dark">
              {links.map((link) => (
                <Menu.Item key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 rounded-sm p-2 transition-all hover:bg-accent hover:text-light"
                  >
                    {link.icon}
                    {link.text}
                  </Link>
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      {/* <ul className="flex w-full items-center divide-x-2 divide-light/10 text-lg font-semibold ">
        {links.map((link) => (
          <li key={link.href} className="px-2 text-light/60 hover:text-light">
            <Link href={link.href}>{link.text}</Link>
          </li>
        ))}
      </ul> */}
      <Link href="/auth/signin" className="ml-auto mr-2 rounded-md bg-dark p-2">
        {session.data?.user ? (
          <div>
            <div className="relative w-12">
              <Image alt="awatar" src={session.data.user.image || ""} fill />
            </div>
            {session.data.user.name}
          </div>
        ) : (
          "Zaloguj"
        )}
      </Link>
    </header>
  );
};

export default Nav;
