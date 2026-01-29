/* eslint-disable no-unused-vars */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  UserCheck,
  Target,
  Award,
  Shield,
  Briefcase,
  ChevronRight,
  Sparkles,
} from "lucide-react";

const services = [
  {
    id: "staffing",
    title: "Healthcare Staffing (Temporary & Contract)",
    icon: Users,
    gradient: "from-blue-600 to-cyan-600",
    image:
      "https://plus.unsplash.com/premium_photo-1661761151437-a5f7fbe5753b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8SGVhbHRoY2FyZSUyMFN0YWZmaW5nJTIwKFRlbXBvcmFyeSUyMCUyNiUyMENvbnRyYWN0KXxlbnwwfHwwfHx8MA%3D%3D",
    description: (
      <>
        <p className="text-lg leading-relaxed text-gray-700">
          Alikair provides temporary and contract-based healthcare staffing
          services designed to support government agencies, public-sector
          institutions, and contract-based healthcare programs.
        </p>
        <p className="mt-5 text-lg leading-relaxed text-gray-700">
          Our staffing solutions are structured to meet fluctuating workforce
          demands while maintaining compliance, continuity of care, and
          operational readiness.
        </p>
      </>
    ),
    features: [
      "Temporary and contract healthcare staffing solutions",
      "Clinical and non-clinical healthcare professionals",
      "Support for short-term, long-term, and project-based programs",
      "Staffing aligned with contract timelines and performance periods",
      "Rapid workforce scaling for mission-critical requirements",
    ],
  },
  {
    id: "permanent",
    title: "Permanent Placement",
    icon: UserCheck,
    gradient: "from-purple-600 to-pink-600",
    image:
      "https://plus.unsplash.com/premium_photo-1683121855240-5d3f67a5fdec?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVjcnVpdGVtZW50fGVufDB8fDB8fHww",
    description: (
      <>
        <p className="text-lg leading-relaxed text-gray-700">
          Alikair supports permanent placement services focused on long-term
          workforce stability within regulated healthcare environments.
        </p>
        <p className="mt-5 text-lg leading-relaxed text-gray-700">
          We work closely with clients to identify candidates who meet
          technical, regulatory, and organizational requirements.
        </p>
      </>
    ),
    features: [
      "Direct-hire recruitment for clinical and administrative roles",
      "Candidate sourcing aligned with position requirements",
      "Support for hard-to-fill and mission-critical roles",
      "Emphasis on long-term retention and workforce continuity",
      "Placement processes aligned with compliance standards",
    ],
  },
  {
    id: "recruiting",
    title: "Full-Cycle Recruiting",
    icon: Target,
    gradient: "from-teal-600 to-green-600",
    image:
      "https://plus.unsplash.com/premium_photo-1661508869516-861e3cd6ef71?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cmVjcnVpdGVtZW50fGVufDB8fDB8fHww",
    description: (
      <>
        <p className="text-lg leading-relaxed text-gray-700">
          Alikair delivers end-to-end recruiting services covering the entire
          talent acquisition lifecycle.
        </p>
        <p className="mt-5 text-lg leading-relaxed text-gray-700">
          Our full-cycle recruiting model ensures transparency, consistency, and
          alignment with government and public-sector hiring requirements.
        </p>
      </>
    ),
    features: [
      "Workforce planning and job requirement analysis",
      "Candidate sourcing and initial screening",
      "Interview coordination and evaluation support",
      "Offer management and placement coordination",
      "Recruiting workflows aligned with compliance standards",
    ],
  },
  {
    id: "credentials",
    title: "Credential & License Verification",
    icon: Award,
    gradient: "from-orange-600 to-red-600",
    image:
      "https://plus.unsplash.com/premium_photo-1683842188982-e2920f594fda?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Q3JlZGVudGlhbCUyMCUyNiUyMExpY2Vuc2UlMjBWZXJpZmljYXRpb258ZW58MHx8MHx8fDA%3D",
    description: (
      <>
        <p className="text-lg leading-relaxed text-gray-700">
          Alikair supports credential and license verification processes to help
          ensure healthcare professionals meet role-specific and regulatory
          requirements.
        </p>
        <p className="mt-5 text-lg leading-relaxed text-gray-700">
          Verification processes are conducted in alignment with contract
          requirements and applicable regulations.
        </p>
      </>
    ),
    features: [
      "Professional license verification",
      "Credential review based on role and program requirements",
      "Documentation tracking and validation support",
      "Alignment with government and contract compliance standards",
    ],
  },
  {
    id: "background",
    title: "Background Screening Coordination",
    icon: Shield,
    gradient: "from-indigo-600 to-blue-600",
    image:
      "https://plus.unsplash.com/premium_photo-1677093906217-9420a5f16322?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8VmVyaWZpY2F0aW9ufGVufDB8fDB8fHww",
    description: (
      <>
        <p className="text-lg leading-relaxed text-gray-700">
          Alikair coordinates background screening processes in accordance with
          contract requirements and applicable regulatory frameworks.
        </p>
        <p className="mt-5 text-lg leading-relaxed text-gray-700">
          Screening coordination is tailored to role-specific and program-level
          compliance needs.
        </p>
      </>
    ),
    features: [
      "Background check coordination through approved providers",
      "Support for role-specific screening requirements",
      "Documentation management and compliance tracking",
      "Alignment with contract and program security standards",
    ],
  },
  {
    id: "workforce",
    title: "Workforce Support Services",
    icon: Briefcase,
    gradient: "from-emerald-600 to-teal-600",
    image:
      "https://images.unsplash.com/photo-1766066014237-00645c74e9c6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8V29ya2ZvcmNlJTIwU3VwcG9ydCUyMFNlcnZpY2VzfGVufDB8fDB8fHww",
    description: (
      <>
        <p className="text-lg leading-relaxed text-gray-700">
          Alikair provides workforce support services designed to maintain
          operational continuity throughout the contract lifecycle.
        </p>
        <p className="mt-5 text-lg leading-relaxed text-gray-700">
          These services help ensure staffing stability, workforce readiness,
          and uninterrupted healthcare delivery.
        </p>
      </>
    ),
    features: [
      "Onboarding and placement coordination",
      "Workforce scheduling and assignment support",
      "Ongoing workforce coordination during active contracts",
      "Support for continuity of care and operational readiness",
    ],
  },
];

const ServicesTabs = () => {
  const [activeTab, setActiveTab] = useState(services[0].id);
  const activeService = services.find((s) => s.id === activeTab);
  const ActiveIcon = activeService?.icon;

  return (
    <section className="relative bg-gradient-to-b from-slate-50 via-white to-slate-50 py-20 md:py-32 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-teal-500/5 to-cyan-500/5 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:32px_32px]"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-100 to-cyan-100 px-5 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-teal-600" />
            <span className="text-sm font-bold uppercase tracking-wider text-teal-700">
              Our Core Services
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tight leading-[1.1] mb-6">
            Premium Healthcare
            <span className="block bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Staffing & Talent Solutions
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Compliant, mission-ready workforce services tailored for government
            agencies, public-sector institutions, and regulated healthcare programs.
          </p>
        </motion.div>

        {/* Services Grid Layout - Cards Style */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isActive = activeTab === service.id;
            
            return (
              <motion.button
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onClick={() => setActiveTab(service.id)}
                className={`
                  group relative p-8 text-left rounded-2xl transition-all duration-500
                  ${
                    isActive
                      ? `bg-gradient-to-br ${service.gradient} text-white shadow-2xl scale-[1.02]`
                      : "bg-white hover:bg-gray-50 text-gray-900 shadow-lg hover:shadow-xl border border-gray-100"
                  }
                `}
              >
                {/* Glow Effect for Active Card */}
                {isActive && (
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.gradient} opacity-20 blur-xl -z-10`} />
                )}

                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`
                    p-3 rounded-xl transition-all duration-300
                    ${
                      isActive
                        ? "bg-white/20 backdrop-blur-sm"
                        : `bg-gradient-to-br ${service.gradient} text-white`
                    }
                  `}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  <ChevronRight
                    className={`
                    w-5 h-5 transition-all duration-300
                    ${isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 group-hover:opacity-70 group-hover:translate-x-0"}
                  `}
                  />
                </div>

                <h3
                  className={`
                  text-xl font-bold mb-2 leading-tight
                  ${isActive ? "text-white" : "text-gray-900"}
                `}
                >
                  {service.title}
                </h3>

                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="text-sm text-white/90 mt-2"
                  >
                    Tap to view details below
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Active Service Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Image Section */}
                <div className="relative h-[400px] lg:h-auto">
                  <img
                    src={activeService.image}
                    alt={activeService.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${activeService.gradient} opacity-20`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  {/* Floating Icon Badge */}
                  <div className="absolute top-8 left-8">
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${activeService.gradient} shadow-2xl`}>
                      <ActiveIcon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
                    {activeService.title}
                  </h2>

                  <div className="space-y-4 mb-8">
                    {activeService.description}
                  </div>

                  {/* Features List */}
                  <div className="space-y-4">
                    {activeService.features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-start gap-3 group"
                      >
                        <div className={`mt-1.5 p-1 rounded-full bg-gradient-to-br ${activeService.gradient} shrink-0`}>
                          <div className="w-2 h-2 rounded-full bg-white" />
                        </div>
                        <p className="text-base text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors">
                          {feature}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      mt-8 w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-white
                      bg-gradient-to-r ${activeService.gradient}
                      shadow-lg hover:shadow-xl transition-all duration-300
                      flex items-center justify-center gap-2 group
                    `}
                  >
                    Learn More
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            { label: "Years Experience", value: "15+" },
            { label: "Healthcare Facilities", value: "500+" },
            { label: "Satisfied Clients", value: "1000+" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="text-center p-8 rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 font-semibold">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesTabs;