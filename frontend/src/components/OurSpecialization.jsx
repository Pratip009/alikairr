const focusAreas = [
  {
    title: "Clinical Healthcare Staffing",
    description:
      "Qualified physicians, nurses, and clinical professionals supporting regulated healthcare environments.",
  },
  {
    title: "Allied Health Professionals",
    description:
      "Skilled allied health personnel supporting diagnostics, therapy, and patient care operations.",
  },
  {
    title: "Healthcare Administrative & Support Staff",
    description:
      "Non-clinical healthcare professionals ensuring operational continuity and administrative efficiency.",
  },
  {
    title: "Contract-Based & Program-Specific Workforce Support",
    description:
      "Scalable staffing solutions aligned with government contracts and public-sector healthcare programs.",
  },
];

const OurSpecialization = () => {
  return (
    <section className="bg-slate-950 py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="max-w-3xl">
          <span className="text-sm font-medium uppercase tracking-wide text-slate-400">
            Capabilities
          </span>
          <h2 className="mt-3 text-3xl font-semibold text-slate-100">
            Our Specialization
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-300">
            Alikair specializes exclusively in healthcare staffing and recruiting.
            Our services are designed to support public health programs,
            government-funded healthcare initiatives, and contract-based
            healthcare operations.
          </p>
        </div>

        {/* Focus Areas */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {focusAreas.map((area, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-slate-700"
            >
              <h3 className="text-lg font-medium text-slate-100">
                {area.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                {area.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurSpecialization;
