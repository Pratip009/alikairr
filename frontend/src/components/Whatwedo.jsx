/* eslint-disable no-unused-vars */
import React from "react";
import {
  Stethoscope,
  ClipboardList,
  Clock,
  Shield,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

const WhatWeDo = () => {
  const services = [
    {
      icon: Stethoscope,
      title: "Clinical Staffing",
      subtitle: "Licensed Healthcare Professionals",
      items: [
        "Physicians & Specialists",
        "Registered Nurses (RN/LPN)",
        "Allied Health Professionals",
        "Therapists & Technicians",
      ],
      color: "blue",
    },
    {
      icon: ClipboardList,
      title: "Non-Clinical & Administrative",
      subtitle: "Healthcare Support Staff",
      items: [
        "Medical Administrative Staff",
        "Health Information Specialists",
        "Practice Managers",
        "Support & Coordination Staff",
      ],
      color: "emerald",
    },
    {
      icon: Clock,
      title: "Flexible Staffing Solutions",
      subtitle: "Scalable Workforce Models",
      items: [
        "Short-Term Assignments",
        "Long-Term Placements",
        "Project-Based Staffing",
        "Emergency & Surge Support",
      ],
      color: "violet",
    },
    {
      icon: Shield,
      title: "Government & Contract Programs",
      subtitle: "Compliance-Ready Workforce",
      items: [
        "Federal Contract Support",
        "State & Local Programs",
        "Prime Contractor Partnerships",
        "Regulatory Compliance Management",
      ],
      color: "amber",
    },
  ];

  const colorVariants = {
    blue: {
      bg: "from-blue-50 to-blue-100",
      icon: "text-blue-600",
      border: "border-blue-200",
      dot: "bg-blue-600",
      accent: "from-blue-500 to-blue-600",
    },
    emerald: {
      bg: "from-emerald-50 to-emerald-100",
      icon: "text-emerald-600",
      border: "border-emerald-200",
      dot: "bg-emerald-600",
      accent: "from-emerald-500 to-emerald-600",
    },
    violet: {
      bg: "from-violet-50 to-violet-100",
      icon: "text-violet-600",
      border: "border-violet-200",
      dot: "bg-violet-600",
      accent: "from-violet-500 to-violet-600",
    },
    amber: {
      bg: "from-amber-50 to-amber-100",
      icon: "text-amber-600",
      border: "border-amber-200",
      dot: "bg-amber-600",
      accent: "from-amber-500 to-amber-600",
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
          
          .services-font {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          }

          .service-card {
            position: relative;
            overflow: hidden;
          }

          .service-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, transparent, currentColor, transparent);
            opacity: 0;
            transition: opacity 0.3s ease;
          }

          .service-card:hover::before {
            opacity: 1;
          }
        `}
      </style>

      <section className="py-16 sm:py-20 lg:py-28 bg-white services-font">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mb-12 sm:mb-16 lg:mb-20"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              What We Do
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 leading-relaxed">
              Alikair specializes in healthcare staffing and recruiting services
              designed to meet the operational, compliance, and workforce needs
              of public-sector healthcare programs.
            </p>
          </motion.div>

          {/* Services Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
          >
            {services.map((service, index) => {
              const Icon = service.icon;
              const colors = colorVariants[service.color];

              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.2 },
                  }}
                  className="service-card group bg-white rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-gray-200"
                  style={{ color: colors.icon.replace("text-", "") }}
                >
                  <div className="flex items-start gap-5 mb-6">
                    {/* Icon */}
                    <div
                      className={`flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${colors.bg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${colors.border} border-2`}
                    >
                      <Icon
                        className={`w-7 h-7 sm:w-8 sm:h-8 ${colors.icon}`}
                        strokeWidth={2}
                      />
                    </div>

                    {/* Title & Subtitle */}
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                        {service.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-500 font-medium">
                        {service.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Service Items - Optimized for Scanning */}
                  <div className="space-y-3 pl-1">
                    {service.items.map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-start gap-3 group/item"
                      >
                        <CheckCircle2
                          className={`w-5 h-5 ${colors.icon} flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform`}
                          strokeWidth={2.5}
                        />
                        <span className="text-sm sm:text-base text-gray-700 font-medium leading-relaxed">
                          {item}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Bottom Gradient Line */}
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <div
                      className={`h-1 w-0 group-hover:w-full bg-gradient-to-r ${colors.accent} rounded-full transition-all duration-500`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Key Differentiator Banner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 sm:mt-16 lg:mt-20"
          >
            <div className="bg-gradient-to-r from-slate-900 via-gray-800 to-slate-900 rounded-2xl p-8 sm:p-10 lg:p-12 text-center shadow-2xl">
              <div className="max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
                  <Shield className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-semibold text-white">
                    Government-Ready Staffing Solutions
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
                  Compliance-Focused. Mission-Critical. Dependable.
                </h3>

                <p className="text-base sm:text-lg text-gray-300 mb-8 leading-relaxed">
                  Every placement is vetted, credentialed, and ready to serve in
                  regulated healthcare environments. We understand the procurement
                  process and deliver workforce solutions that align with federal,
                  state, and local requirements.
                </p>

                <button className="group inline-flex items-center gap-3 px-8 py-4 bg-white hover:bg-gray-100 text-gray-900 font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                  <span>View Our Capabilities</span>
                  <ArrowRight
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    strokeWidth={2.5}
                  />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Quick Stats Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-gray-200"
          >
            {[
              { label: "Compliance Rate", value: "100%" },
              { label: "Avg. Time to Fill", value: "< 48hrs" },
              { label: "Retention Rate", value: "94%" },
              { label: "Client Satisfaction", value: "4.9/5" },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default WhatWeDo;