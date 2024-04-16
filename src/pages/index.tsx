import React from "react";
import HeroBanner from "../components/homepage/HeroBanner";
import RecentFisheries from "../components/homepage/RecentFisheries";
import Footer from "../components/footer/footer";
import RecentDiscussions from "../components/homepage/recent-discussions";

const Home = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center pt-14 text-black">
      <div className="mb-12 w-screen max-w-screen-2xl rounded-b-md bg-white px-2 pb-4 shadow-md dark:bg-primary-dark dark:shadow-black xl:px-8 xl:pb-6">
        <HeroBanner />
        <RecentFisheries />
        <RecentDiscussions />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
