import React from "react";
import HeroBanner from "../components/homepage/HeroBanner";
import RecentFisheries from "../components/homepage/RecentFisheries";
import Footer from "../components/footer/footer";
import Image from "next/image";
import RecentDiscussions from "../components/homepage/recent-discussions";

const Home = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center pt-16 text-black dark:bg-primary-950">
      <Image
        src="images/decorations/wave-pattern.svg"
        alt=""
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%" }}
        className="relative -top-12 h-20 rotate-180 object-cover object-top sm:-top-8 lg:h-32 xl:h-40"
      />
      <div className="mb-12 max-w-screen-xl">
        <HeroBanner />
        <RecentFisheries />
        <RecentDiscussions />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
