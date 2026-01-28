import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

import "swiper/css";
import "swiper/css/pagination";

import { testimonials } from "../assets/assets";

const Testimonials = () => {
  return (
    <section className="py-24 px-6 md:px-20 bg-gradient-to-b from-[#0b1020] via-[#0f172a] to-[#020617]">
      {/* Heading */}
      <div className="text-center mb-16 px-4">
        <h2 className="text-4xl font-bold text-white mb-3">
          What Our Customers Say
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Real stories from people who trusted our platform and succeeded
        </p>
      </div>

      <Swiper
        modules={[Pagination, Autoplay]}
        loop
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
          bulletClass:
            "swiper-pagination-bullet !bg-gray-600 !opacity-100",
          bulletActiveClass:
            "!bg-blue-500 !scale-125",
        }}
        spaceBetween={30}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="px-4 !pb-14"
      >
        {testimonials.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="group h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-lg hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1">
              
              {/* Quote Icon */}
              <FaQuoteLeft className="text-blue-400 text-3xl mb-6 opacity-80" />

              {/* Description */}
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
                {item.description}
              </p>

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-sm" />
                ))}
              </div>

              {/* User */}
              <div className="flex items-center gap-4 mt-auto">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/150?text=User";
                  }}
                  className="w-12 h-12 rounded-full object-cover border border-white/20"
                />

                <div>
                  <h4 className="font-semibold text-white leading-tight">
                    {item.name}
                  </h4>
                  <p className="text-xs text-gray-400">
                    {item.position}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonials;
