/* eslint-disable no-unused-vars */
import React from "react";
import { Shield, CheckCircle2, Building2, Award } from "lucide-react";
import { motion } from "framer-motion";

const CompanyOverview = () => {
  const trustIndicators = [
    {
      icon: Shield,
      text: "Compliance-Certified",
      color: "blue",
    },
    {
      icon: CheckCircle2,
      text: "Government-Ready",
      color: "emerald",
    },
    {
      icon: Building2,
      text: "Established Provider",
      color: "slate",
    },
    {
      icon: Award,
      text: "Quality Assured",
      color: "amber",
    },
  ];

  const colorSchemes = {
    blue: "from-blue-500 to-blue-600",
    emerald: "from-emerald-500 to-emerald-600",
    slate: "from-slate-500 to-slate-600",
    amber: "from-amber-500 to-amber-600",
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@700;800&display=swap');
          
          .company-overview-font {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          }

          .company-heading {
            font-family: 'Playfair Display', serif;
          }

          .elegant-line {
            position: relative;
            overflow: hidden;
          }

          .elegant-line::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.5), transparent);
          }

          @keyframes float-subtle {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-5px); }
          }

          .float-subtle {
            animation: float-subtle 4s ease-in-out infinite;
          }

          @keyframes shimmer-line {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }

          .shimmer-container {
            position: relative;
            overflow: hidden;
          }

          .shimmer-container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
            animation: shimmer-line 3s infinite;
          }
        `}
      </style>

      <section className="py-16 sm:py-20 lg:py-28 bg-gradient-to-b from-white via-gray-50 to-white company-overview-font">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Legal Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full mb-6 sm:mb-8"
            >
              <Shield className="w-4 h-4 text-slate-700" />
              <span className="text-sm font-bold text-slate-700 tracking-wide">
                REGISTERED HEALTHCARE STAFFING FIRM
              </span>
            </motion.div>

            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-8 sm:mb-10"
            >
              <h2 className="company-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 elegant-line pb-6">
                About Alikair
              </h2>
            </motion.div>

            {/* Main Content with Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-10 sm:mb-12"
            >
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-10">
                {/* Text Content */}
                <div>
                  <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 leading-relaxed">
                    Alikair LLC is a healthcare staffing and recruiting firm
                    focused on supporting government agencies, public sector
                    institutions, and prime contractors. We deliver qualified
                    healthcare professionals to meet the operational demands of
                    regulated and mission-critical environments.
                  </p>
                </div>

                {/* Image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                  className="relative rounded-2xl overflow-hidden shadow-xl"
                >
                  <div className="aspect-[4/3] relative">
                    <img
                      src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop&auto=format&q=80"
                      alt="Healthcare professionals collaborating"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    {/* Image Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent" />
                  </div>
                  {/* Image Badge */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Shield className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">Professional Excellence</p>
                        <p className="text-xs text-gray-600">Trusted Healthcare Staffing</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Legal Entity Highlight Box */}
              <div className="shimmer-container bg-gradient-to-r from-slate-50 to-blue-50 border-2 border-slate-200 rounded-2xl p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl flex items-center justify-center flex-shrink-0 float-subtle">
                    <Building2 className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm sm:text-base text-slate-600 font-semibold mb-2">
                      Legal Business Name
                    </p>
                    <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                      Alikair LLC
                    </p>
                    <p className="text-sm text-slate-500 mt-2 font-medium">
                      Licensed Healthcare Staffing Provider
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Trust Indicators Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-12"
            >
              {trustIndicators.map((indicator, index) => {
                const Icon = indicator.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="relative group"
                  >
                    <div className="bg-white border-2 border-gray-200 rounded-xl p-4 sm:p-5 text-center transition-all duration-300 hover:border-gray-300 hover:shadow-lg">
                      <div
                        className={`w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 bg-gradient-to-br ${colorSchemes[indicator.color]} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                      </div>
                      <p className="text-xs sm:text-sm font-bold text-gray-800 leading-tight">
                        {indicator.text}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Key Commitments Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="border-t border-gray-200 pt-10 sm:pt-12 mb-10 sm:mb-12"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">
                Our Commitment
              </h3>
              <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
                {[
                  {
                    title: "Compliance First",
                    description:
                      "Full adherence to federal, state, and local healthcare regulations",
                  },
                  {
                    title: "Quality Assurance",
                    description:
                      "Rigorous vetting and credentialing of all healthcare professionals",
                  },
                  {
                    title: "Mission Support",
                    description:
                      "Dedicated to supporting critical public health initiatives",
                  },
                ].map((commitment, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-50 rounded-xl p-5 sm:p-6 border border-gray-200 hover:border-gray-300 transition-colors duration-300"
                  >
                    <div className="w-2 h-2 rounded-full bg-blue-600 mb-3" />
                    <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
                      {commitment.title}
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {commitment.description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bottom Seal */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="pt-10 sm:pt-12 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-center gap-4 text-center"
            >
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-slate-600" />
                <span className="text-sm font-semibold text-slate-600">
                  Trusted by Government Agencies
                </span>
              </div>
              <div className="hidden sm:block w-px h-5 bg-slate-300" />
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-slate-600" />
                <span className="text-sm font-semibold text-slate-600">
                  Verified Healthcare Provider
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default CompanyOverview;