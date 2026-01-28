/* eslint-disable no-unused-vars */
import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { categoryIcon } from "../assets/assets";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp } from "lucide-react";

const JobCategory = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();

  const handleClick = useCallback(
    (index, name) => {
      setActiveIndex(index);
      setTimeout(() => setActiveIndex(null), 150);
      navigate(`/all-jobs/${encodeURIComponent(name)}`);
      window.scrollTo(0, 0);
    },
    [navigate]
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');
          
          .category-section {
            font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
          }
          
          .category-card {
            position: relative;
            overflow: hidden;
          }
          
          .category-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
            transition: left 0.5s;
          }
          
          .category-card:hover::before {
            left: 100%;
          }
          
          .icon-glow {
            filter: drop-shadow(0 4px 12px rgba(0,0,0,0.1));
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .category-card:hover .icon-glow {
            filter: drop-shadow(0 8px 24px rgba(0,0,0,0.15));
            transform: translateY(-4px) scale(1.1);
          }
        `}
      </style>

      <section className="category-section mt-16 md:mt-24 lg:mt-28 mb-16 mx-5">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-gradient-to-r from-gray-100 to-gray-50 rounded-full border border-gray-200"
          >
            <TrendingUp className="w-4 h-4 text-gray-700" />
            <span className="text-sm font-bold text-gray-700 tracking-wide">TRENDING CATEGORIES</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 tracking-tight"
          >
            Popular Job Categories
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-medium px-4"
          >
            Discover top job categories tailored to your skills and career goals
          </motion.p>
        </div>

        {/* Grid of Categories */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4 md:gap-5 lg:gap-6"
        >
          {Array.isArray(categoryIcon) &&
            categoryIcon.map((icon, index) => {
              const isActive = activeIndex === index;
              const isHovered = hoveredIndex === index;
              
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  onClick={() => handleClick(index, icon.name)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleClick(index, icon.name);
                  }}
                  tabIndex={0}
                  role="button"
                  aria-pressed={isActive}
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`category-card relative group bg-white p-5 md:p-6 lg:p-7 rounded-2xl border-2 cursor-pointer transition-all duration-300 flex flex-col items-center text-center ${
                    isActive
                      ? "border-gray-900 bg-gradient-to-br from-gray-50 to-white shadow-2xl"
                      : isHovered
                      ? "border-gray-300 shadow-xl"
                      : "border-gray-100 hover:border-gray-200 shadow-md hover:shadow-lg"
                  }`}
                >
                  {/* Gradient Background Effect */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-50/50 via-white to-gray-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  
                  {/* Icon Container */}
                  <div className={`relative z-10 mb-4 md:mb-5 transition-all duration-300 ${
                    isActive ? "scale-110" : ""
                  }`}>
                    <div className={`relative p-4 md:p-5 rounded-xl md:rounded-2xl transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-br from-gray-900 to-gray-700 shadow-2xl"
                        : "bg-gradient-to-br from-gray-50 to-gray-100 group-hover:from-gray-100 group-hover:to-gray-200"
                    }`}>
                      {/* Icon Glow Effect */}
                      <div className={`absolute inset-0 rounded-xl md:rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 ${
                        isActive ? "bg-gray-900" : "bg-gray-400"
                      }`} />
                      
                      <img
                        className={`icon-glow relative w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 transition-all duration-300 ${
                          isActive ? "brightness-0 invert" : ""
                        }`}
                        src={icon.icon}
                        alt={icon.name}
                        title={icon.name}
                        loading="lazy"
                      />
                    </div>

                    {/* Active Indicator Ring */}
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="absolute -inset-2 border-2 border-gray-900 rounded-2xl"
                      />
                    )}
                  </div>

                  {/* Category Name */}
                  <span className={`relative z-10 font-bold text-sm md:text-base transition-colors duration-300 ${
                    isActive ? "text-gray-900" : "text-gray-700 group-hover:text-gray-900"
                  }`}>
                    {icon.name}
                  </span>

                  {/* Hover Arrow */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{
                      opacity: isHovered ? 1 : 0,
                      x: isHovered ? 0 : -10,
                    }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-3 right-3"
                  >
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </motion.div>

                  {/* Bottom Accent Line */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900"
                      : "bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 opacity-0 group-hover:opacity-100"
                  }`} />
                </motion.div>
              );
            })}
        </motion.div>

        {/* View All Categories Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center mt-12 md:mt-16"
        >
          <button
            onClick={() => navigate('/all-jobs/all')}
            className="group relative px-8 md:px-10 py-4 md:py-5 bg-gradient-to-r from-gray-900 via-black to-gray-900 hover:from-black hover:via-gray-900 hover:to-black text-white font-bold rounded-xl md:rounded-2xl transition-all duration-300 shadow-2xl shadow-gray-900/30 hover:shadow-gray-900/50 transform hover:scale-105 overflow-hidden flex items-center gap-3"
          >
            <span className="relative z-10 text-sm md:text-base lg:text-lg tracking-tight">
              View All Categories
            </span>
            <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          </button>
        </motion.div>
      </section>
    </>
  );
};

export default JobCategory;