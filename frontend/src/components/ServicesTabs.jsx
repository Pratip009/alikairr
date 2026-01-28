import { useState } from "react";

const services = [
  {
    id: "staffing",
    title: "Healthcare Staffing (Temporary & Contract)",
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
        <ul className="mt-8 space-y-4 text-base text-gray-700">
          <li className="flex items-start">
            <span className="mr-4 mt-2 h-3 w-3 rounded-full bg-teal-500 flex-shrink-0"></span>
            Temporary and contract healthcare staffing solutions
          </li>
          <li className="flex items-start">
            <span className="mr-4 mt-2 h-3 w-3 rounded-full bg-teal-500 flex-shrink-0"></span>
            Clinical and non-clinical healthcare professionals
          </li>
          <li className="flex items-start">
            <span className="mr-4 mt-2 h-3 w-3 rounded-full bg-teal-500 flex-shrink-0"></span>
            Support for short-term, long-term, and project-based programs
          </li>
          <li className="flex items-start">
            <span className="mr-4 mt-2 h-3 w-3 rounded-full bg-teal-500 flex-shrink-0"></span>
            Staffing aligned with contract timelines and performance periods
          </li>
          <li className="flex items-start">
            <span className="mr-4 mt-2 h-3 w-3 rounded-full bg-teal-500 flex-shrink-0"></span>
            Rapid workforce scaling for mission-critical requirements
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "permanent",
    title: "Permanent Placement",
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
        <ul className="mt-8 space-y-4 text-base text-gray-700">
          <li className="flex items-start">
            <span className="mr-4 mt-2 h-3 w-3 rounded-full bg-teal-500 flex-shrink-0"></span>
            Direct-hire recruitment for clinical and administrative roles
          </li>
          <li className="flex items-start">
            <span className="mr-4 mt-2 h-3 w-3 rounded-full bg-teal-500 flex-shrink-0"></span>
            Candidate sourcing aligned with position requirements
          </li>
          <li className="flex items-start">
            <span className="mr-4 mt-2 h-3 w-3 rounded-full bg-teal-500 flex-shrink-0"></span>
            Support for hard-to-fill and mission-critical roles
          </li>
          <li className="flex items-start">
            <span className="mr-4 mt-2 h-3 w-3 rounded-full bg-teal-500 flex-shrink-0"></span>
            Emphasis on long-term retention and workforce continuity
          </li>
          <li className="flex items-start">
            <span className="mr-4 mt-2 h-3 w-3 rounded-full bg-teal-500 flex-shrink-0"></span>
            Placement processes aligned with compliance standards
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "recruiting",
    title: "Full-Cycle Recruiting",
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
        <ul className="mt-8 space-y-4 text-base text-gray-700">
          <li className="flex items-start">
            <span className="mr-4 mt-2 h-3 w-3 rounded-full bg-teal-500 flex-shrink-0"></span>
            Workforce planning and job requirement analysis
          </li>
          <li className="flex items-start">
            <span className="mr-4 mt-2 h-3 w-3 rounded-full bg-teal-500 flex-shrink-0"></span>
            Candidate sourcing and initial screening
          </li>
          <li className="flex items-start">
            <span className="mr-4 mt-2 h-3 w-3 rounded-full bg-teal-500 flex-shrink-0"></span>
            Interview coordination and evaluation support
          </li>
          <li className="flex items-start">
            <span className="mr-4 mt-2 h-3 w-3 rounded-full bg-teal-500 flex-shrink-0"></span>
            Offer management and placement coordination
          </li>
          <li className="flex items-start">
            <span className="mr-4 mt-2 h-3 w-3 rounded-full bg-teal-500 flex-shrink-0"></span>
            Recruiting workflows aligned with compliance standards
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "credentials",
    title: "Credential & License Verification",
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
        <ul className="mt-8 space-y-4 text-base text-gray-700">
          <li className="flex items-start">
            <span className="mr-4 mt-2 h-3 w-3 rounded-full bg-teal-500 flex-shrink-0"></span>
            Professional license verification
          </li>
          <li className="flex items-start">
            <span className="mr-4 mt-2 h-3 w-3 rounded-full bg-teal-500 flex-shrink-0"></span>
            Credential review based on role and program requirements
          </li>
          <li className="flex items-start">
            <span className="mr-4 mt-2 h-3 w-3 rounded-full bg-teal-500 flex-shrink-0"></span>
            Documentation tracking and validation support
          </li>
          <li className="flex items-start">
            <span className="mr-4 mt-2 h-3 w-3 rounded-full bg-teal-500 flex-shrink-0"></span>
            Alignment with government and contract compliance standards
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "background",
    title: "Background Screening Coordination",
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
        <ul className="mt-8 space-y-4 text-base text-gray-700">
          <li className="flex items-start">
            <span className="mr-4 mt-2 h-3 w-3 rounded-full bg-teal-500 flex-shrink-0"></span>
            Background check coordination through approved providers
          </li>
          <li className="flex items-start">
            <span className="mr-4 mt-2 h-3 w-3 rounded-full bg-teal-500 flex-shrink-0"></span>
            Support for role-specific screening requirements
          </li>
          <li className="flex items-start">
            <span className="mr-4 mt-2 h-3 w-3 rounded-full bg-teal-500 flex-shrink-0"></span>
            Documentation management and compliance tracking
          </li>
          <li className="flex items-start">
            <span className="mr-4 mt-2 h-3 w-3 rounded-full bg-teal-500 flex-shrink-0"></span>
            Alignment with contract and program security standards
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "workforce",
    title: "Workforce Support Services",
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
        <ul className="mt-8 space-y-4 text-base text-gray-700">
          <li className="flex items-start">
            <span className="mr-4 mt-2 h-3 w-3 rounded-full bg-teal-500 flex-shrink-0"></span>
            Onboarding and placement coordination
          </li>
          <li className="flex items-start">
            <span className="mr-4 mt-2 h-3 w-3 rounded-full bg-teal-500 flex-shrink-0"></span>
            Workforce scheduling and assignment support
          </li>
          <li className="flex items-start">
            <span className="mr-4 mt-2 h-3 w-3 rounded-full bg-teal-500 flex-shrink-0"></span>
            Ongoing workforce coordination during active contracts
          </li>
          <li className="flex items-start">
            <span className="mr-4 mt-2 h-3 w-3 rounded-full bg-teal-500 flex-shrink-0"></span>
            Support for continuity of care and operational readiness
          </li>
        </ul>
      </>
    ),
  },
];

const ServicesTabs = () => {
  const [activeTab, setActiveTab] = useState(services[0].id);
  const activeService = services.find((s) => s.id === activeTab);

  return (
    <section className="relative bg-gradient-to-b from-gray-50 via-white to-gray-50 py-10 md:py-32 overflow-hidden">
      {/* Optional subtle background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px]"></div>
      </div>

      <div className="relative mx-auto max-w-8xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-block rounded-full bg-teal-100 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-teal-700 mb-6">
            Our Core Services
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Premium Healthcare Staffing & Talent Solutions
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Compliant, mission-ready workforce services tailored for government
            agencies, public-sector institutions, and regulated healthcare
            programs.
          </p>
        </div>

        {/* Tabs + Content Layout */}
        <div className="mt-16 lg:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Vertical Tabs Sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100/80 overflow-hidden sticky top-8 z-10">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setActiveTab(service.id)}
                  className={`
                    group relative w-full px-6 py-5 text-left transition-all duration-300
                    border-b border-gray-100 last:border-b-0
                    hover:bg-teal-50/60
                    ${
                      activeTab === service.id
                        ? "bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-inner"
                        : "text-gray-800 font-medium"
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold tracking-tight">
                      {service.title}
                    </span>
                    <span
                      className={`transform transition-transform duration-300 ${
                        activeTab === service.id
                          ? "rotate-45 opacity-100"
                          : "opacity-0"
                      }`}
                    >
                      →
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Active Service Content */}
          {/* Active Service Content – Flat Layout */}
          <div className="lg:col-span-8">
            <div className="relative">
              {/* Image Section */}
              <div className="relative h-80 md:h-[30rem] overflow-hidden rounded-xl">
                <img
                  src={activeService.image}
                  alt={activeService.title}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 px-8 py-10 md:px-12">
                  <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight max-w-3xl">
                    {activeService.title}
                  </h2>
                </div>
              </div>

              {/* Content Section */}
              <div className="mt-10 md:mt-14 px-2 md:px-4">
                <div className="max-w-4xl">{activeService.description}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesTabs;
