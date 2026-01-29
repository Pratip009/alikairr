import React, { useContext, useEffect } from "react";
import FeaturedJob from "../components/FeaturedJob";
import Hero from "../components/Hero";
import JobCategoryt from "../components/JobCategory";
import Navbar from "../components/Navbar";
import Testimonials from "../components/Testimonials";
import Counter from "../components/Counter";
import Download from "../components/Download";
import Footer from "../components/Footer";
import { AppContext } from "../context/AppContext";
import CareerGuide from "../components/CareerGuide";
import ATSScanner from "../components/Atsscanner";
import FloatingSocials from "../components/FloatingSocials";
import WhoWeServe from "../components/Whoweserve";
import WhatWeDo from "../components/Whatwedo";
import EngageWithUs from "../components/Engagewithus";

const Home = () => {
  const { fetchJobsData } = useContext(AppContext);

  useEffect(() => {
    fetchJobsData();
  }, []);

  return (
    <>
      <Hero />
      <JobCategoryt />
      <WhoWeServe />
      <CareerGuide />
      <WhatWeDo />
      <ATSScanner />
      <FeaturedJob />
      
      <Testimonials />
      <EngageWithUs/>
      
    </>
  );
};

export default Home;
