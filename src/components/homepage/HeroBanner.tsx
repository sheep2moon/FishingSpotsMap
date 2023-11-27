import React from "react";
import { IconMap2 } from "@tabler/icons-react";
import { InternalLink } from "../ui/internal-link";
const HeroBanner = () => {
  return (
    <div className=" flex w-full flex-col items-center justify-center gap-4 px-4 pt-12 text-primary-dark dark:text-primary">
      <h1 className="text-4xl font-black">Odkryj łowiska w twojej okolicy</h1>
      <h3 className="text-xl">
        oraz dziel się swoimi wędkarskimi przygodami z innymi pasjonatami
      </h3>
      <InternalLink
        variant="accent"
        className="mt-8 gap-2 rounded-sm border border-secondary bg-gradient-to-b from-primary-dark to-primary-950 p-6 text-xl text-primary-200 shadow-md shadow-secondary-200/20 transition-all hover:text-primary-50 hover:shadow-secondary-200/40"
        href="/fishing-spots-map"
      >
        <IconMap2 />
        Przejdź do mapy
      </InternalLink>
    </div>
  );
};

export default HeroBanner;
