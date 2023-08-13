import Link from "next/link";
import React from "react";
import { api } from "../../utils/api";
import Image from "next/image";
import heroBgSrc from "../../assets/hero-bg.jpg";
import { IconMap2 } from "@tabler/icons-react";
const HeroBanner = () => {
  const fishingSpotsCountQuery = api.fishery.getFishingSpotsCount.useQuery();

  return (
    <>
      <div className="flex w-full flex-col items-center justify-center p-4 text-primary">
        <h1 className="text-4xl font-black ">
          Odkryj łowiska w twojej okolicy
        </h1>
        <h3 className="text-xl">
          oraz dziel się swoimi wędkarskimi przygodami z innymi pasjonatami
        </h3>
        <div className="relative mt-4 h-48 w-full">
          <Image
            src={heroBgSrc}
            fill
            className="rounded-md object-cover"
            alt=""
          />
          <Link
            href="/fishing-spots-map"
            className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center gap-3 whitespace-nowrap rounded-md bg-accent p-2 text-xl font-bold text-dark shadow-sm shadow-dark transition-all hover:bg-primary/70"
          >
            <IconMap2 />
            Przejdź do mapy
          </Link>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default HeroBanner;
