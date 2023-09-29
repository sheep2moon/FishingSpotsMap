import React from "react";
import HeroBanner from "../components/homepage/HeroBanner";
import RecentFisheries from "../components/homepage/RecentFisheries";
import Footer from "../components/footer/footer";

const Home = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center pt-16 text-black">
      <HeroBanner />
      <RecentFisheries />
      <Footer />
    </div>
  );
};

export default Home;
