import React from 'react';
import { 
  FileText, 
  CheckCircle, 
  Award, 
  MapPin, 
  Shield, 
  Briefcase,
  Users,
  ClipboardCheck,
  UserCheck,
  FileCheck,
  Settings
} from 'lucide-react';

export default function CapabilitiesPage() {
  const coreCompetencies = [
    "Healthcare staffing (temporary, contract, and program-based)",
    "Permanent placement for clinical and healthcare administrative roles",
    "Full-cycle recruiting aligned with public-sector hiring standards",
    "Credential and license verification support",
    "Background screening coordination",
    "Workforce onboarding and continuity support",
    "Contract-aligned staffing and personnel management"
  ];

  const differentiators = [
    "Exclusive focus on healthcare staffing and recruiting",
    "Experience supporting government and public-sector programs",
    "Structured recruiting and vetting processes",
    "Alignment with contract requirements and performance periods",
    "Reliable workforce placement focused on continuity of care",
    "Clear communication and documentation throughout the staffing lifecycle"
  ];

  const naicsCodes = [
    { code: "561311", description: "Employment Placement Agencies" },
    { code: "561320", description: "Temporary Help Services" }
  ];

  const coverage = [
    "Regional and multi-state service capability",
    "Support for urban and rural healthcare facilities",
    "Ability to staff single-location and distributed programs",
    "Remote recruiting and workforce coordination capabilities"
  ];

  const complianceAreas = [
    { icon: FileText, text: "Contract-specific staffing and documentation requirements" },
    { icon: UserCheck, text: "Role-based credential and license verification" },
    { icon: Shield, text: "Background screening coordination through approved providers" },
    { icon: ClipboardCheck, text: "Program-level compliance expectations" },
    { icon: Settings, text: "Workforce continuity and operational readiness standards" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-8 bg-gray-900"></div>
            <span className="text-sm font-semibold text-gray-600 tracking-wider uppercase">
              Company Capabilities
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Capabilities Overview
          </h1>
          <div className="max-w-4xl">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Alikair LLC is a healthcare staffing and recruiting firm providing compliant, reliable 
              workforce solutions for government agencies, public-sector institutions, and prime contractors. 
              Our capabilities are aligned with contract-based healthcare operations, public health programs, 
              and regulated staffing environments.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              We operate within established procurement frameworks and support workforce continuity where 
              reliability and compliance are critical.
            </p>
          </div>
        </div>
      </div>

      {/* Hero Image Section */}
      <div className="relative h-64 bg-gray-800">
        <img 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&h=400&fit=crop" 
          alt="Professional office environment"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block px-6 py-3 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg">
              <p className="text-gray-900 font-semibold text-xl">
                Supporting Healthcare Delivery Through Workforce Excellence
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-16 space-y-16">
        {/* Core Competencies */}
        <section>
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <Briefcase className="w-6 h-6 text-gray-900" strokeWidth={2} />
              <h2 className="text-3xl font-bold text-gray-900">Core Competencies</h2>
            </div>
            <p className="text-gray-700 leading-relaxed max-w-4xl">
              Alikair's core competencies are focused exclusively on healthcare staffing and workforce 
              support within public-sector and government-funded environments.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 divide-y divide-gray-200">
            {coreCompetencies.map((competency, index) => (
              <div key={index} className="px-6 py-4 flex items-start gap-4 hover:bg-gray-50 transition-colors">
                <CheckCircle className="w-5 h-5 text-gray-900 flex-shrink-0 mt-0.5" strokeWidth={2} />
                <span className="text-gray-800">{competency}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Differentiators */}
        <section>
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <Award className="w-6 h-6 text-gray-900" strokeWidth={2} />
              <h2 className="text-3xl font-bold text-gray-900">Differentiators</h2>
            </div>
            <p className="text-gray-700 leading-relaxed max-w-4xl">
              Alikair differentiates itself through a focused, compliance-driven approach to healthcare 
              staffing. We prioritize reliability, documentation, and operational alignment over volume-based 
              recruiting.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {differentiators.map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gray-900 rounded-full flex-shrink-0 mt-2"></div>
                  <p className="text-gray-800 font-medium">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* NAICS Codes */}
        <section>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="flex items-center gap-3 mb-6">
              <FileCheck className="w-6 h-6 text-gray-900" strokeWidth={2} />
              <h2 className="text-3xl font-bold text-gray-900">NAICS Codes</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              Alikair operates under the following North American Industry Classification System (NAICS) codes:
            </p>
            
            <div className="space-y-4">
              {naicsCodes.map((naics, index) => (
                <div key={index} className="flex items-center gap-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="bg-gray-900 text-white px-4 py-2 rounded font-mono font-bold text-lg">
                    {naics.code}
                  </div>
                  <span className="text-gray-800 font-medium">{naics.description}</span>
                </div>
              ))}
            </div>
            
            <p className="text-gray-600 text-sm mt-6 italic">
              These classifications align with our healthcare staffing, recruiting, and workforce support 
              services for government and public-sector clients.
            </p>
          </div>
        </section>

        {/* Geographic Coverage */}
        <section>
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <MapPin className="w-6 h-6 text-gray-900" strokeWidth={2} />
              <h2 className="text-3xl font-bold text-gray-900">Geographic Coverage</h2>
            </div>
            <p className="text-gray-700 leading-relaxed max-w-4xl mb-6">
              Alikair provides healthcare staffing and recruiting services across multiple geographic regions, 
              supporting both localized and multi-site healthcare operations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {coverage.map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-5 shadow-sm border border-gray-200 flex items-center gap-4">
                <div className="w-8 h-8 bg-gray-900 rounded flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-white" strokeWidth={2} />
                </div>
                <span className="text-gray-800">{item}</span>
              </div>
            ))}
          </div>

          <div className="bg-gray-100 rounded-lg p-6 border-l-4 border-gray-900">
            <p className="text-gray-700 italic">
              Geographic scope is tailored based on contract requirements and program needs.
            </p>
          </div>
        </section>

        {/* Compliance Awareness */}
        <section>
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <Shield className="w-6 h-6 text-gray-900" strokeWidth={2} />
              <h2 className="text-3xl font-bold text-gray-900">Compliance Awareness & Risk Management</h2>
            </div>
            <p className="text-gray-700 leading-relaxed max-w-4xl">
              Alikair operates with a strong awareness of compliance, regulatory requirements, and risk 
              management standards applicable to public-sector healthcare staffing.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Our processes are designed to align with:
            </h3>
            
            <div className="space-y-4">
              {complianceAreas.map((area, index) => (
                <div key={index} className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="w-10 h-10 bg-gray-900 rounded flex items-center justify-center flex-shrink-0">
                    <area.icon className="w-5 h-5 text-white" strokeWidth={2} />
                  </div>
                  <p className="text-gray-800 pt-1.5">{area.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-gray-900 rounded-lg">
              <p className="text-gray-100 leading-relaxed">
                We recognize that compliance is not optional in public healthcare environments and structure 
                our staffing processes accordingly.
              </p>
            </div>
          </div>
        </section>

        {/* Closing Statement */}
        <section className="border-t-2 border-gray-900 pt-12">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-10 text-center">
            <Users className="w-12 h-12 text-gray-900 mx-auto mb-6" strokeWidth={1.5} />
            <p className="text-2xl font-bold text-gray-900 leading-relaxed">
              Alikair LLC supports healthcare delivery where compliance, workforce continuity, 
              and public accountability matter most.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}