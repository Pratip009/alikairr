/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import JobCard from "./JobCard";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { motion } from "framer-motion";
import { ArrowRight, Briefcase, Star, TrendingUp } from "lucide-react";

const FeaturedJob = () => {
  const { jobs, jobLoading } = useContext(AppContext);
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');
          
          .featured-section {
            font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
          }
          
          .gradient-text {
            background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          .feature-glow {
            position: relative;
          }
          
          .feature-glow::before {
            content: '';
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: linear-gradient(45deg, #f3f4f6, #e5e7eb, #f3f4f6);
            border-radius: inherit;
            opacity: 0;
            transition: opacity 0.3s;
            z-index: -1;
          }
          
          .feature-glow:hover::before {
            opacity: 1;
          }
        `}
      </style>

      <section className="featured-section mt-16 md:mt-24 lg:mt-28 mb-16 px-5 md:px-15">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 mb-5 bg-gradient-to-r from-gray-900 to-gray-800 rounded-full shadow-lg"
          >
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-bold text-white tracking-wide">FEATURED POSITIONS</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 md:mb-5 tracking-tight px-4"
          >
            Featured Jobs
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-medium px-4"
          >
            Know your worth and find the job that qualifies your life
          </motion.p>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-12 mt-8 md:mt-10"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm md:text-base font-bold text-gray-700">
                {jobs?.length || 0}+ Active Jobs
              </span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-gray-200" />
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-gray-600" />
              <span className="text-sm md:text-base font-bold text-gray-700">
                Updated Daily
              </span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-gray-200" />
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-gray-600" />
              <span className="text-sm md:text-base font-bold text-gray-700">
                Top Companies
              </span>
            </div>
          </motion.div>
        </div>

        {/* Content */}
        {jobLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center mt-16 md:mt-20"
          >
            <Loader />
            <p className="mt-6 text-gray-600 font-medium">Loading amazing opportunities...</p>
          </motion.div>
        ) : !Array.isArray(jobs) || jobs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center mt-16 md:mt-20 p-8 md:p-12 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-gray-200"
          >
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <Briefcase className="w-10 h-10 text-gray-400" />
            </div>
            <p className="text-xl font-bold text-gray-700 mb-2">No jobs found</p>
            <p className="text-gray-500">Check back soon for new opportunities</p>
          </motion.div>
        ) : (
          <>
            {/* Jobs Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid gap-5 md:gap-6 lg:gap-7 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            >
              {[...jobs]
                .reverse()
                .slice(0, 6)
                .map((job, index) => (
                  <motion.div key={job.id || index} variants={itemVariants}>
                    <JobCard job={job} />
                  </motion.div>
                ))}
            </motion.div>

            {/* See More Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 md:mt-16"
            >
              <button
                onClick={() => {
                  navigate("/all-jobs/all");
                  window.scrollTo(0, 0);
                }}
                className="group relative px-10 md:px-12 py-4 md:py-5 bg-gradient-to-r from-gray-900 via-black to-gray-900 hover:from-black hover:via-gray-900 hover:to-black text-white font-bold rounded-xl md:rounded-2xl transition-all duration-300 shadow-2xl shadow-gray-900/30 hover:shadow-gray-900/50 transform hover:scale-105 overflow-hidden flex items-center gap-3"
              >
                <span className="relative z-10 text-sm md:text-base lg:text-lg tracking-tight">
                  Explore All Jobs
                </span>
                <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </button>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="hidden sm:inline">or</span>
                <button
                  onClick={() => {
                    navigate("/all-jobs/all");
                    window.scrollTo(0, 0);
                  }}
                  className="font-bold text-gray-900 hover:text-gray-700 transition-colors underline decoration-2 underline-offset-4 hover:decoration-gray-400"
                >
                  Browse by category
                </button>
              </div>
            </motion.div>

            {/* Bottom Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 md:mt-16 p-6 md:p-8 bg-gradient-to-br from-gray-50 via-white to-gray-50 rounded-2xl border-2 border-gray-200 shadow-lg"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-2">
                    Can't find what you're looking for?
                  </h3>
                  <p className="text-gray-600 font-medium">
                    Create a job alert and we'll notify you when new positions match your criteria
                  </p>
                </div>
                <button
                  onClick={() => navigate("/all-jobs/all")}
                  className="group whitespace-nowrap px-6 md:px-8 py-3 md:py-4 bg-white border-2 border-gray-900 text-gray-900 font-bold rounded-xl hover:bg-gray-900 hover:text-white transition-all duration-300 shadow-md hover:shadow-xl flex items-center gap-2"
                >
                  <span className="text-sm md:text-base">Create Alert</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </section>
    </>
  );
};

export default FeaturedJob;