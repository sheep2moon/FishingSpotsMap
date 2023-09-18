import Link from "next/link";
import React from "react";
import { api } from "../../lib/utils/api";
import Image from "next/image";
import heroBgSrc from "../../assets/hero-bg.jpg";
import { IconMap2 } from "@tabler/icons-react";
import { InternalLink } from "../ui/internal-link";
const HeroBanner = () => {
  const fishingSpotsCountQuery = api.fishery.getFishingSpotsCount.useQuery();

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 px-4 pt-12 text-primary-dark dark:text-primary">
      <h1 className="text-4xl font-black">Odkryj łowiska w twojej okolicy</h1>
      <h3 className="text-xl">
        oraz dziel się swoimi wędkarskimi przygodami z innymi pasjonatami
      </h3>
      <InternalLink
        variant="outline"
        className="mt-8 gap-2 text-xl"
        href="/fishing-spots-map"
      >
        <IconMap2 />
        Przejdź do mapy
      </InternalLink>
    </div>
  );
};

export default HeroBanner;
