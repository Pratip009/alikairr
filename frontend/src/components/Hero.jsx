/* eslint-disable no-unused-vars */
import React, { useContext, useRef, useState, useEffect } from "react";
import {
  Search,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Sparkles,
} from "lucide-react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Hero = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [direction, setDirection] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState({});

  const titleRef = useRef(null);
  const locationRef = useRef(null);

  const { setSearchFilter, setIsSearched } = useContext(AppContext);

  // Healthcare staffing focused carousel slides
  const slides = [
    {
      type: "image",
      src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1920&h=1080&fit=crop&auto=format&q=80",
      title: "Healthcare Staffing Solutions for Government Programs",
      subtitle: "Trusted Partner for Public Sector Healthcare",
      description:
        "Connecting qualified healthcare professionals with government agencies and prime contractors nationwide.",
      tags: ["Government Ready", "Compliance Focused", "Rapid Deployment"],
    },
    {
      type: "image",
      src: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=1920&h=1080&fit=crop&auto=format&q=80",
      title: "Supporting Federal & State Healthcare Initiatives",
      subtitle: "Staffing Excellence for Public Health",
      description:
        "Providing clinical and administrative professionals for hospitals, health systems, and government-funded programs.",
      tags: ["Prime Contractors", "Public Health", "Licensed Professionals"],
    },
    {
      type: "image",
      src: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=1920&h=1080&fit=crop&auto=format&q=80",
      title: "Clinical & Allied Health Workforce Solutions",
      subtitle: "Quality Healthcare Recruitment",
      description:
        "From nurses and physicians to allied health staff—scalable solutions for regulated healthcare environments.",
      tags: ["RN Staffing", "Allied Health", "Administrative Support"],
    },
  ];

  // Preload images for smooth transitions
  useEffect(() => {
    slides.forEach((slide, index) => {
      const img = new Image();
      img.src = slide.src;
      img.onload = () => {
        setImagesLoaded(prev => ({ ...prev, [index]: true }));
      };
    });
  }, []);

  const searchHandler = (e) => {
    e.preventDefault();

    setSearchFilter({
      title: titleRef.current.value,
      location: locationRef.current.value,
    });

    setIsSearched(true);

    if (titleRef.current.value || locationRef.current.value) {
      navigate("/all-jobs/all");
    }
  };

  // Auto-play carousel
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isPlaying, slides.length]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Poppins:wght@600;700;800&display=swap');
          
          .hero-font {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          }
          
          .hero-title {
            font-family: 'Poppins', sans-serif;
            font-weight: 700;
            letter-spacing: -0.02em;
            line-height: 1.2;
          }
          
          .hero-subtitle {
            font-family: 'Inter', sans-serif;
            font-weight: 600;
          }

          /* Optimize image rendering */
          img {
            image-rendering: -webkit-optimize-contrast;
            image-rendering: crisp-edges;
          }
        `}
      </style>

      <section
        className="relative w-full h-[700px] md:h-[750px] lg:h-[800px] overflow-hidden bg-gradient-to-br from-blue-900 via-gray-800 to-slate-900"
        id="hero"
      >
        {/* Carousel Container */}
        <div className="relative w-full h-full">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
                scale: { duration: 0.4 },
              }}
              className="absolute inset-0"
            >
              {/* Image Background with Loading State */}
              <div className="relative w-full h-full">
                {!imagesLoaded[currentSlide] && (
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-gray-800 to-slate-900 animate-pulse" />
                )}
                <img
                  src={slides[currentSlide].src}
                  alt={slides[currentSlide].title}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="eager"
                  decoding="async"
                  style={{ opacity: imagesLoaded[currentSlide] ? 1 : 0 }}
                />

                {/* Refined Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 via-transparent to-slate-900/40" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex items-center justify-center pb-32 md:pb-20">
                <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto hero-font">
                  {/* Animated Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 mb-4 sm:mb-5 md:mb-6 bg-blue-500/20 backdrop-blur-md rounded-full border border-blue-300/30"
                  >
                    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-blue-300" />
                    <span className="text-white text-xs sm:text-sm font-semibold tracking-wide hero-subtitle">
                      {slides[currentSlide].subtitle}
                    </span>
                  </motion.div>

                  {/* Main Title - Reduced Size */}
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="hero-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-3 sm:mb-4 md:mb-5 px-2"
                    style={{
                      textShadow: "0 4px 20px rgba(0,0,0,0.5)",
                    }}
                  >
                    {slides[currentSlide].title}
                  </motion.h1>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 mb-4 sm:mb-5 md:mb-6 max-w-2xl mx-auto font-medium hero-font px-4"
                    style={{
                      textShadow: "0 2px 10px rgba(0,0,0,0.5)",
                    }}
                  >
                    {slides[currentSlide].description}
                  </motion.p>

                  {/* Tags */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="hidden sm:flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-5 md:mb-7"
                  >
                    {slides[currentSlide].tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 md:px-4 md:py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 text-white text-xs md:text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </motion.div>

                  {/* Search Form */}
                  <motion.form
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    onSubmit={searchHandler}
                    className="bg-white backdrop-blur-xl rounded-xl md:rounded-2xl shadow-2xl p-3 sm:p-4 md:p-5 flex flex-col sm:flex-row gap-3 md:gap-4 items-stretch sm:items-center w-full max-w-4xl mx-auto border border-gray-200"
                  >
                    {/* Job Title Input */}
                    <div className="flex items-center bg-gray-50 border-2 border-gray-200 rounded-lg md:rounded-xl px-3 sm:px-4 md:px-5 py-3 md:py-4 w-full group hover:border-blue-400 focus-within:border-blue-600 transition-all duration-300">
                      <Search
                        className="text-gray-400 group-hover:text-blue-600 mr-2 sm:mr-3 shrink-0 transition-colors"
                        size={20}
                      />
                      <input
                        type="text"
                        name="job"
                        placeholder="RN, Physician, Allied Health..."
                        aria-label="Job Title"
                        autoComplete="on"
                        className="w-full outline-none text-sm md:text-base bg-transparent placeholder-gray-500 font-medium hero-font"
                        ref={titleRef}
                      />
                    </div>

                    {/* Location Input */}
                    <div className="flex items-center bg-gray-50 border-2 border-gray-200 rounded-lg md:rounded-xl px-3 sm:px-4 md:px-5 py-3 md:py-4 w-full group hover:border-blue-400 focus-within:border-blue-600 transition-all duration-300">
                      <MapPin
                        className="text-gray-400 group-hover:text-blue-600 mr-2 sm:mr-3 shrink-0 transition-colors"
                        size={20}
                      />
                      <input
                        type="text"
                        name="location"
                        placeholder="City, State or Remote"
                        aria-label="Location"
                        autoComplete="on"
                        className="w-full outline-none text-sm md:text-base bg-transparent placeholder-gray-500 font-medium hero-font"
                        ref={locationRef}
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="group relative w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 md:py-4 px-6 sm:px-8 md:px-10 rounded-lg md:rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 overflow-hidden hero-font flex items-center justify-center"
                    >
                      <span className="relative z-10 text-sm md:text-base whitespace-nowrap">
                        Find Jobs
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    </button>
                  </motion.form>

                  {/* Quick Stats */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    className="flex mt-6 sm:mt-8 lg:mt-10 flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10"
                  >
                    <div className="text-center">
                      <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white hero-title">
                        5,000+
                      </div>
                      <div className="text-xs sm:text-sm text-gray-300 font-medium mt-1">
                        Healthcare Jobs
                      </div>
                    </div>
                    <div className="w-px h-8 md:h-10 bg-white/20"></div>
                    <div className="text-center">
                      <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white hero-title">
                        500+
                      </div>
                      <div className="text-xs sm:text-sm text-gray-300 font-medium mt-1">
                        Healthcare Facilities
                      </div>
                    </div>
                    <div className="w-px h-8 md:h-10 bg-white/20"></div>
                    <div className="text-center">
                      <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white hero-title">
                        15+ Years
                      </div>
                      <div className="text-xs sm:text-sm text-gray-300 font-medium mt-1">
                        Industry Experience
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        <div className="hidden lg:flex absolute inset-y-0 left-0 right-0 items-center justify-between px-6 lg:px-10 pointer-events-none z-30">
          <button
            onClick={prevSlide}
            className="group pointer-events-auto w-12 h-12 lg:w-14 lg:h-14 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-300 border border-white/30 hover:border-white/50 hover:scale-110"
            aria-label="Previous slide"
          >
            <ChevronLeft
              className="text-white group-hover:scale-110 transition-transform"
              size={24}
            />
          </button>
          <button
            onClick={nextSlide}
            className="group pointer-events-auto w-12 h-12 lg:w-14 lg:h-14 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-300 border border-white/30 hover:border-white/50 hover:scale-110"
            aria-label="Next slide"
          >
            <ChevronRight
              className="text-white group-hover:scale-110 transition-transform"
              size={24}
            />
          </button>
        </div>

        {/* Play/Pause Button */}
        <div className="absolute top-4 sm:top-6 md:top-8 right-4 sm:right-6 md:right-8 z-30">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="group w-10 h-10 sm:w-12 sm:h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-300 border border-white/30 hover:border-white/50"
            aria-label={isPlaying ? "Pause carousel" : "Play carousel"}
          >
            {isPlaying ? (
              <Pause className="text-white" size={16} fill="white" />
            ) : (
              <Play className="text-white ml-0.5" size={16} fill="white" />
            )}
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 sm:gap-3 bg-black/20 backdrop-blur-md px-4 sm:px-5 py-2.5 sm:py-3 rounded-full border border-white/20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 ${
                index === currentSlide
                  ? "w-8 sm:w-10 h-2 bg-white rounded-full"
                  : "w-2 h-2 bg-white/50 hover:bg-white/75 rounded-full hover:scale-125"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Slide Counter */}
        <div className="hidden sm:block absolute bottom-4 sm:bottom-6 md:bottom-8 left-4 sm:left-6 md:left-8 z-30 bg-black/20 backdrop-blur-md px-3 sm:px-4 py-2 sm:py-2.5 rounded-full border border-white/20">
          <span className="text-white text-xs sm:text-sm font-bold hero-font">
            {String(currentSlide + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </span>
        </div>

        {/* Subtle Background Effects */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-30">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl" />
        </div>
      </section>
    </>
  );
};

export default Hero;