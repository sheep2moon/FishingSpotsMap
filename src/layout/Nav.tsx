"use client";
import { Combobox, Menu, Transition } from "@headlessui/react";
import { IconMap2, IconSearch } from "@tabler/icons-react";
import { IconMapPinPlus } from "@tabler/icons-react";
import { IconHome, IconMenu2 } from "@tabler/icons-react";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import { api } from "../utils/api";
import type { FishingSpot } from "@prisma/client";
import { useRouter } from "next/router";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ThemeToggle from "./ThemeToggle";

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
  {
    text: "Lista miejsc",
    href: "/fishing-spot/spot-search",
    icon: <IconMap2 />,
  },
];

const Nav = () => {
  const session = useSession();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const deboncedSearchQuery = useDebounce<string>(searchQuery, 600);
  const searchResultsQuery = api.fishery.searchFishingSpots.useQuery(
    {
      searchQuery: deboncedSearchQuery,
    },
    { enabled: false }
  );
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    if (deboncedSearchQuery.length >= 3) void searchResultsQuery.refetch();
  }, [deboncedSearchQuery]);

  const handleSelectSearchSpot = (spot: FishingSpot) => {
    console.log("spot");
    void router.push(`/fishing-spot/${spot.id}`);
  };
  const handleSpotSearch = () => {
    console.log("handleSearch", searchQuery);
  };

  return (
    <header
      className={clsx(
        "duration-400 fixed inset-x-0 top-0 z-[999999] mx-auto flex max-w-screen-xl items-center bg-primary-100 py-2 text-primary-dark shadow-md shadow-primary-700/50 transition-all dark:bg-primary-950 dark:text-primary lg:rounded-b-md"
        // {
        //   "bg-opacity-0": scrollPosition === 0,
        //   "bg-opacity-70": scrollPosition > 0,
        // }
      )}
    >
      <Menu as="div" className="relative ml-2 h-10 sm:w-24">
        <div className="bg-dark grid aspect-square w-10 place-items-center rounded-full p-2 text-xl">
          <Menu.Button className="dark:text-secondary">
            <IconMenu2 />
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
            <div className="flex flex-col gap-2 rounded-md border-2 border-primary-dark bg-primary px-1 py-2 text-lg  dark:bg-primary-dark dark:text-primary dark:ring dark:ring-secondary">
              {links.map((link) => (
                <Menu.Item key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-dark flex items-center gap-2 rounded-sm p-2 dark:hover:bg-secondary/20 "
                  >
                    {link.icon}
                    {link.text}
                  </Link>
                </Menu.Item>
              ))}
              <Menu.Item>
                <div className="flex items-center gap-2 px-2 sm:hidden">
                  <ThemeToggle />
                  <label htmlFor="theme-toggle" className="">
                    Zmień motyw
                  </label>
                </div>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>

      <Combobox
        as="div"
        className="text-dark mx-auto flex h-10 items-center gap-2 lg:w-72"
        onChange={handleSelectSearchSpot}
      >
        <div className="w-full">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg text-left shadow-md shadow-primary-dark/30 outline-none focus:ring focus:ring-primary-dark sm:text-sm">
            <Combobox.Input
              value={searchQuery}
              onChange={handleSearchInputChange}
              id="search-spots"
              type="text"
              className=" w-full rounded-lg border-none bg-primary py-2 pl-3 pr-10 text-base leading-5 dark:bg-primary-dark"
              placeholder="Wyszukaj łowisko"
              // displayValue={(result: FishingSpot) => result.name}
            ></Combobox.Input>
            <button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <IconSearch />
            </button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setSearchQuery("")}
          >
            <div>
              {searchQuery !== "" && searchQuery.length >= 3 && (
                <Combobox.Options className="absolute mt-1 max-h-60 w-full max-w-xs overflow-auto rounded-md bg-white p-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {(!searchResultsQuery.data ||
                    searchResultsQuery.data?.length === 0) && (
                    <div className="flex h-10 cursor-default select-none items-center justify-center px-4 text-gray-700">
                      {searchResultsQuery.isLoading ? (
                        <div className="relative mx-auto w-14">
                          <LoadingSpinner />
                        </div>
                      ) : (
                        "Brak wyników."
                      )}
                    </div>
                  )}
                  {searchResultsQuery.data?.map((result) => (
                    <Combobox.Option
                      className={({ active }) =>
                        `relative cursor-default select-none p-2 ${
                          active ? "bg-teal-600 text-white" : "text-gray-900"
                        }`
                      }
                      key={result.id}
                      value={result}
                    >
                      <span className="block truncate">{result.name}</span>
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              )}
            </div>
          </Transition>
        </div>
        {/* <button onClick={handleSpotSearch}>
          
        </button> */}
      </Combobox>

      <div className="mr-2 flex w-24 justify-end gap-2">
        <div className="hidden sm:mr-4 sm:flex sm:items-center">
          <ThemeToggle />
        </div>
        <Link
          href="/auth/signin"
          className="flex items-center justify-center rounded-md border px-2.5 py-2 text-sm dark:border-secondary dark:bg-primary-dark sm:px-4 sm:text-base"
        >
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
      </div>
    </header>
  );
};

export default Nav;
