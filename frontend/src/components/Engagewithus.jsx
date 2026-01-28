/* eslint-disable no-unused-vars */
import React from "react";
import { Send, MessageSquare, Shield, Clock, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const EngageWithUs = () => {
  const trustIndicators = [
    {
      icon: Shield,
      text: "Confidential Inquiries",
    },
    {
      icon: CheckCircle,
      text: "Compliance-Focused",
    },
    {
      icon: Clock,
      text: "24-48hr Response Time",
    },
  ];

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
          
          .engage-font {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          }

          .shimmer {
            position: relative;
            overflow: hidden;
          }

          .shimmer::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            animation: shimmer 3s infinite;
          }

          @keyframes shimmer {
            0% { left: -100%; }
            100% { left: 100%; }
          }

          .button-gradient {
            background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
            position: relative;
            overflow: hidden;
          }

          .button-gradient::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
            opacity: 0;
            transition: opacity 0.3s ease;
          }

          .button-gradient:hover::after {
            opacity: 1;
          }

          .button-gradient > * {
            position: relative;
            z-index: 1;
          }
        `}
      </style>

      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white to-gray-50 engage-font">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* Main Card */}
            <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
              {/* Decorative Background Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-50 to-transparent rounded-full blur-3xl opacity-50 -mr-32 -mt-32" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-slate-50 to-transparent rounded-full blur-3xl opacity-50 -ml-32 -mb-32" />

              <div className="relative z-10 p-8 sm:p-10 lg:p-12">
                {/* Header Section */}
                <div className="text-center mb-8 sm:mb-10">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-6"
                  >
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                    <span className="text-sm font-semibold text-blue-600">
                      Ready to Connect
                    </span>
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6"
                  >
                    Engage with Alikair
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
                  >
                    If you are a government agency or prime contractor seeking
                    healthcare staffing support, our team is available to discuss
                    your requirements and timelines.
                  </motion.p>
                </div>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center mb-8 sm:mb-10"
                >
                  {/* Primary Button */}
                  <button className="button-gradient group px-8 py-4 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-3">
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    <span className="text-base sm:text-lg">
                      Request Staffing Support
                    </span>
                  </button>

                  {/* Secondary Button */}
                  <button className="group px-8 py-4 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold rounded-xl transition-all duration-300 border-2 border-gray-200 hover:border-gray-300 shadow-md hover:shadow-lg transform hover:scale-105 flex items-center justify-center gap-3">
                    <MessageSquare className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    <span className="text-base sm:text-lg">Contact Us</span>
                  </button>
                </motion.div>

                {/* Trust Indicators */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 mb-8"
                >
                  {trustIndicators.map((indicator, index) => {
                    const Icon = indicator.icon;
                    return (
                      <div
                        key={index}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <Icon className="w-4 h-4 text-blue-600 flex-shrink-0" />
                        <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                          {indicator.text}
                        </span>
                      </div>
                    );
                  })}
                </motion.div>

                {/* Confidentiality Note */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="pt-8 border-t border-gray-200"
                >
                  <div className="flex items-start gap-3 justify-center max-w-2xl mx-auto">
                    <Shield className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-600 leading-relaxed text-center">
                      <span className="font-semibold text-gray-800">
                        All inquiries are handled with confidentiality and
                        compliance in mind.
                      </span>{" "}
                      We understand the sensitivity of government procurement and
                      contractor relationships.
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Decorative Bottom Border */}
              <div className="h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent" />
            </div>

            {/* Optional Contact Info Cards - Below Main CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6"
            >
              {/* Phone */}
              <div className="bg-gradient-to-br from-slate-50 to-white p-6 rounded-2xl border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-medium">
                      Direct Line
                    </div>
                    <div className="text-sm font-bold text-gray-900">
                      Available on Request
                    </div>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="bg-gradient-to-br from-slate-50 to-white p-6 rounded-2xl border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-medium">
                      Email Address
                    </div>
                    <div className="text-sm font-bold text-gray-900">
                      staffing@alikair.com
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default EngageWithUs;