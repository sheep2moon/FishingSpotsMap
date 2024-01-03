import React, { useState } from "react";
import { IconMap2, IconSearch } from "@tabler/icons-react";
import { InternalLink } from "../ui/internal-link";
import { Input } from "../ui/input";
import Image from "next/image";
const HeroBanner = () => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="grid w-full grid-cols-1 gap-4 px-4 pt-4 text-primary-dark dark:text-primary md:grid-cols-2">
      <div className="flex flex-col justify-center">
        <h1 className="text-5xl font-black">
          Przeglądaj <span className="text-secondary">łowiska</span> w całej
          Polsce
        </h1>
        <h3 className="text-xl">
          Dziel się swoimi wędkarskimi przygodami z innymi pasjonatami
        </h3>
        <div className="mt-4 flex max-w-md items-center gap-2">
          <Input
            type="search"
            icon={<IconSearch />}
            className="w-full"
            placeholder="Wyszukaj łowisko"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <InternalLink
            variant="default"
            href={`/fishing-spot/list?search=${searchQuery}`}
          >
            Szukaj
          </InternalLink>
        </div>
      </div>
      <div>
        <div className="relative aspect-video w-full">
          <Image src="images/decorations/map-sheet.svg" alt="" fill />
          <InternalLink
            variant="accent"
            className="absolute left-1/2 top-1/2 z-10 mt-8 -translate-x-1/2 gap-2 rounded-md bg-gradient-to-b from-primary-dark to-primary-950 p-6 text-xl text-primary-200 shadow-md shadow-secondary-200/20 ring-accent transition-all duration-75 hover:text-primary-50 hover:ring-2"
            href="/fishing-spots-map"
          >
            <IconMap2 />
            Przejdź do mapy
          </InternalLink>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
