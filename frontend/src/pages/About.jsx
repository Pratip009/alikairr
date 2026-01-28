/* eslint-disable no-unused-vars */
import React from "react";
import Counter from "../components/Counter";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Testimonials from "../components/Testimonials";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { SlideLeft, SlideUp } from "../utils/Animation";
import CompanyOverview from "../components/Companyoverview";
import OurSpecialization from "../components/OurSpecialization";
import HowWeOperate from "../components/HowWeOperate";
import ComplianceReliability from "../components/ComplianceReliability";
import MissionWorkforceContinuity from "../components/MissionWorkforceContinuity";

const About = () => {
  return (
    <>
      <section>
        <CompanyOverview />
        <OurSpecialization/>
        <HowWeOperate/>
        <ComplianceReliability/>
        <MissionWorkforceContinuity/>
      </section>
    </>
  );
};

export default About;
