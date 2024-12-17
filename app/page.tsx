import FeaturesSection from "@components/home/Features/Features";
import HomeHero from "@components/home/Hero/Hero";
import Events from "@components/home/Events/Events";
import React from "react";

const Home = () => {
  return (
    <div className="mt-[-100px] h-full w-full bg-black">
      <HomeHero />
      <FeaturesSection />
      <Events />
    </div>
  );
};

export default Home;
