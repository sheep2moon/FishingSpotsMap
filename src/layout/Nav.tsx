import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const links = [
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
  return (
    <header className="fixed inset-x-0 top-0 z-[999999] flex h-16 items-center border-b bg-primary px-2 text-light shadow-md dark:text-light dark:shadow-black/40 lg:px-4">
      <ul className="flex w-full items-center gap-4 text-lg font-semibold">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>{link.text}</Link>
          </li>
        ))}
        <li key="/auth/signin" className="ml-auto">
          <Link href="/auth/signin">
            {session.data?.user ? (
              <div>
                <div className="relative w-12">
                  <Image
                    alt="awatar"
                    src={session.data.user.image || ""}
                    fill
                  />
                </div>
                {session.data.user.name}
              </div>
            ) : (
              "Zaloguj"
            )}
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Nav;
