"use client";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const links = [
  {
    text: "Strona Główna",
    href: "/",
  },
  {
    text: "Dodaj miejsce",
    href: "/add-fishing-spot",
  },
  {
    text: "Mapa miejsc",
    href: "/fishing-spots-map",
  },
];

const Nav = () => {
  const session = useSession();
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header
      className={clsx(
        "duration-400 fixed inset-x-0 top-0 z-[999999] flex h-16  items-center bg-black px-2 text-light transition-all lg:px-4",
        {
          "bg-opacity-0": scrollPosition === 0,
          "bg-opacity-70": scrollPosition > 0,
        }
      )}
    >
      <ul className="flex w-full items-center divide-x-2 divide-light/10 text-lg font-semibold ">
        {links.map((link) => (
          <li key={link.href} className="px-2 text-light/60 hover:text-light">
            <Link href={link.href}>{link.text}</Link>
          </li>
        ))}
      </ul>
      <Link href="/auth/signin">
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
