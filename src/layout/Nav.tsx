"use client";
import { Combobox, Menu, Transition } from "@headlessui/react";
import {
  IconCheck,
  IconChevronDown,
  IconChevronsDown,
  IconMap2,
  IconSearch,
} from "@tabler/icons-react";
import { IconMapPinPlus } from "@tabler/icons-react";
import { IconHome, IconMenu2 } from "@tabler/icons-react";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import { Input } from "../components/common/Input";
import useDebounce from "../hooks/useDebounce";
import { api } from "../utils/api";
import { FishingSpot } from "@prisma/client";
import { useRouter } from "next/router";
import LoadingSpinner from "../components/common/LoadingSpinner";

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
        "duration-400 fixed inset-x-0 top-0 z-[999999] mx-auto flex max-w-screen-xl items-center bg-light py-2 text-light shadow-md shadow-dark/40 transition-all lg:rounded-b-md"
        // {
        //   "bg-opacity-0": scrollPosition === 0,
        //   "bg-opacity-70": scrollPosition > 0,
        // }
      )}
    >
      <Menu as="div" className="relative ml-2 h-10 w-24">
        <div className="grid aspect-square w-10 place-items-center rounded-full bg-dark p-2 text-xl">
          <Menu.Button>
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
            <div className="flex flex-col gap-2 rounded-md border-2 border-dark/20 bg-white px-1 py-2  text-lg text-dark/70">
              {links.map((link) => (
                <Menu.Item key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 rounded-sm p-2 hover:bg-light hover:text-dark "
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

      <Combobox
        as="div"
        className="mx-auto flex h-10 items-center gap-2 text-dark lg:w-72"
        onChange={handleSelectSearchSpot}
      >
        <div className="w-full">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              value={searchQuery}
              onChange={handleSearchInputChange}
              id="search-spots"
              type="text"
              className="w-full rounded-lg border-none py-2 pl-3 pr-10 leading-5 outline-dark"
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

      <div className="mr-2 flex w-24 justify-end">
        <Link
          href="/auth/signin"
          className="rounded-md bg-dark p-2 text-center"
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
