/* eslint-disable no-unused-vars */
import React from "react";
import { Building2, Hospital, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const WhoWeServe = () => {
  const services = [
    {
      icon: Building2,
      title: "Government Agencies",
      description:
        "Federal, state, and local government entities requiring qualified healthcare personnel for public health, clinical operations, and government-funded programs.",
      features: [
        "Federal Health Programs",
        "State Public Health",
        "Local Health Departments",
        "VA & Military Health",
      ],
    },
    {
      icon: Hospital,
      title: "Public Sector Institutions",
      description:
        "Public hospitals, healthcare systems, and community health organizations operating in regulated and mission-critical environments.",
      features: [
        "Public Hospitals",
        "Community Health Centers",
        "Academic Medical Centers",
        "Regional Health Systems",
      ],
    },
    {
      icon: Users,
      title: "Prime Contractors",
      description:
        "Prime and subcontractors seeking dependable healthcare staffing partners to support contract fulfillment and workforce continuity.",
      features: [
        "Contract Fulfillment",
        "Workforce Continuity",
        "Compliance Management",
        "Scalable Solutions",
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          
          .serve-font {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          }
        `}
      </style>

      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-white serve-font">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Who We Serve
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              Trusted healthcare staffing solutions for government agencies,
              public institutions, and prime contractors nationwide.
            </p>
          </motion.div>

          {/* Cards Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover={{
                    y: -8,
                    transition: { duration: 0.3 },
                  }}
                  className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-gray-300"
                >
                  {/* Icon Container */}
                  <div className="mb-6 relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center group-hover:from-blue-50 group-hover:to-blue-100 transition-all duration-300">
                      <Icon
                        className="w-8 h-8 text-slate-700 group-hover:text-blue-600 transition-colors duration-300"
                        strokeWidth={1.5}
                      />
                    </div>
                    {/* Decorative Element */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-blue-50 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Feature List */}
                  <div className="space-y-3 pt-6 border-t border-gray-100">
                    {service.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 text-sm text-gray-700"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                        <span className="font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Hover Border Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600/0 via-blue-600/5 to-blue-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </motion.div>
              );
            })}
          </motion.div>

          {/* Bottom CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 sm:mt-16 text-center"
          >
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-gradient-to-r from-slate-50 to-blue-50 px-8 py-6 rounded-2xl border border-slate-200">
              <p className="text-gray-700 font-medium text-sm sm:text-base">
                Ready to discuss your healthcare staffing needs?
              </p>
              <Link to="/contact">
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 whitespace-nowrap">
                Contact Our Team
              </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default WhoWeServe;