const operatingModels = [
  {
    label: "Prime Contractor",
    title: "Direct Contract Delivery",
    description:
      "Alikair operates as a prime contractor, directly delivering healthcare staffing solutions for government and public sector contracts.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    label: "Subcontractor",
    title: "Prime Partner Support",
    description:
      "We partner as a subcontractor, supporting prime contractors by providing qualified healthcare personnel aligned with contract requirements and timelines.",
    image: "https://images.unsplash.com/photo-1568992688065-536aad8a12f6?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const HowWeOperate = () => {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="max-w-3xl">
          <span className="text-sm font-medium uppercase tracking-wide text-gray-500">
            Operating Model
          </span>
          <h2 className="mt-3 text-3xl font-semibold text-gray-900">
            How We Operate
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-gray-600">
            Alikair operates within established procurement and contract
            structures, supporting government agencies, public sector
            institutions, and prime contractors with reliable healthcare
            staffing solutions.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-2">
          {operatingModels.map((model, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50"
            >
              {/* Image */}
              <div className="h-48 w-full bg-gray-100">
                <img
                  src={model.image}
                  alt={model.label}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="p-8">
                <span className="inline-block rounded-md border border-gray-300 px-3 py-1 text-xs font-medium uppercase tracking-wide text-gray-600">
                  {model.label}
                </span>

                <h3 className="mt-4 text-xl font-medium text-gray-900">
                  {model.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  {model.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeOperate;
