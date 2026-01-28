const compliancePoints = [
  {
    title: "Contract & Program Adherence",
    description:
      "Strict alignment with contract terms, program requirements, and operational guidelines.",
  },
  {
    title: "Workforce Reliability",
    description:
      "Consistent placement of qualified professionals to ensure uninterrupted healthcare delivery.",
  },
  {
    title: "Structured Vetting Processes",
    description:
      "Standardized recruiting, screening, and verification processes designed for regulated environments.",
  },
];

const ComplianceReliability = () => {
  return (
    <section className="bg-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="max-w-3xl border-l-4 border-gray-900 pl-6">
          <span className="text-sm font-semibold uppercase tracking-wide text-gray-500">
            Risk, Compliance & Trust
          </span>
          <h2 className="mt-3 text-3xl font-semibold text-gray-900">
            Commitment to Compliance and Reliability
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-gray-600">
            Alikair operates with a strong emphasis on compliance, reliability,
            and workforce continuity. We understand the regulatory and
            operational requirements of government and public-sector healthcare
            programs and align our staffing processes accordingly.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {compliancePoints.map((item, index) => (
            <div
              key={index}
              className="relative rounded-xl border border-gray-200 bg-white p-8"
            >
              {/* Minimal marker */}
              <div className="absolute left-0 top-0 h-full w-1 bg-gray-900" />

              <h3 className="text-lg font-medium text-gray-900">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComplianceReliability;
