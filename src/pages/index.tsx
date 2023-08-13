import React from "react";
import HeroBanner from "../components/homepage/HeroBanner";
import RecentFisheries from "../components/homepage/RecentFisheries";

const Home = () => {
  return (
    <div className="mt-16 flex w-full flex-col items-center justify-center text-black">
      <HeroBanner />
      <RecentFisheries />
    </div>
  );
};

export default Home;
