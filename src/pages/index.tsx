import Image from "next/image";
import React from "react";
import heroImgSrc from "../assets/hero-bg.jpg";
import { api } from "../utils/api";
import Link from "next/link";

const Home = () => {
  const fishingSpotsCountQuery = api.fishery.getFishingSpotsCount.useQuery();
  return (
    <div className="-mt-16 flex w-full flex-col items-center justify-center text-black">
      <div className="relative h-screen w-full ">
        <Image className="object-cover" alt="" src={heroImgSrc} fill />
        <div className="z-99 absolute left-0 right-0 top-0 h-32 bg-gradient-to-b from-black to-black/0"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-light">
          <h3 className="text-6xl font-black drop-shadow-[0_1.8px_1.8px_rgba(0,0,0,0.9)]">
            {fishingSpotsCountQuery.data}
          </h3>
          <h1 className="text-6xl font-black drop-shadow-[0_1.8px_1.8px_rgba(0,0,0,0.9)] ">
            ŁOWISK
          </h1>
          {/* <h3 className="text-xl font-black uppercase drop-shadow-[0_1.8px_1.8px_rgba(0,0,0,0.9)]">
            czeka na ciebie
          </h3> */}
          <Link
            href="/fishing-spots-map"
            className="mt-6 rounded-md bg-black/30 p-2 text-2xl font-bold drop-shadow-[0_1.8px_1.8px_rgba(0,0,0,0.9)] transition-all hover:bg-black"
          >
            PRZEJDŹ DO MAPY
          </Link>
        </div>
        {/* <div className="absolute bottom-0 left-0 right-0 flex h-32 justify-center bg-gradient-to-t from-black to-black/0 text-light">
          <div className="flex flex-col items-center justify-end pb-4">
            <p className="uppercase text-light/70">liczba łowisk</p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Home;
