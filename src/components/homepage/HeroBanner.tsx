import Link from "next/link";
import React from "react";
import { api } from "../../lib/utils/api";
import Image from "next/image";
import heroBgSrc from "../../assets/hero-bg.jpg";
import { IconMap2 } from "@tabler/icons-react";
import InternalLink from "../common/InternalLink";
const HeroBanner = () => {
  const fishingSpotsCountQuery = api.fishery.getFishingSpotsCount.useQuery();

  return (
    <>
      <div className="text-primary-dark dark:text-primary flex w-full flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-black">Odkryj łowiska w twojej okolicy</h1>
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
          <InternalLink
            variant="secondary"
            className="absolute left-1/2 top-1/2 -translate-x-1/2"
            href="/fishing-spots-map"
          >
            <IconMap2 />
            Przejdź do mapy
          </InternalLink>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default HeroBanner;
