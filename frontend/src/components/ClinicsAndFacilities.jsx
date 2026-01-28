import React from 'react';
import { MapPin, Users, ClipboardList, Activity } from 'lucide-react';

export default function ClinicsAndFacilities() {
  const workforceSupport = [
    { icon: MapPin, title: "Community health clinics" },
    { icon: Users, title: "Public health outreach programs" },
    { icon: ClipboardList, title: "Contract-based clinical operations" },
    { icon: Activity, title: "Program-specific healthcare initiatives" }
  ];

  return (
    <div className="min-h-screen bg-white py-16 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Title Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Clinics & Government-Funded <br />Healthcare Facilities
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-teal-500 mx-auto mb-8"></div>
        </div>

        {/* Image and Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl h-80">
              <img 
                src="https://images.unsplash.com/photo-1581594549595-35f6edc7b762?w=800&h=600&fit=crop" 
                alt="Medical clinic"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 to-transparent"></div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-3xl p-8 shadow-xl h-full flex flex-col justify-center">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                We partner with clinics and healthcare facilities funded through federal, state, or local 
                government programs. These environments often require flexible staffing models while maintaining 
                strict regulatory and reporting standards.
              </p>
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-100 to-teal-100 rounded-xl">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Activity className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
                <p className="text-green-900 font-semibold">
                  Flexible staffing with strict compliance standards
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Workforce Support Cards */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Alikair provides workforce support for:
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workforceSupport.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-teal-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <item.icon className="w-8 h-8 text-white" strokeWidth={2} />
                </div>
                <p className="text-gray-800 font-semibold">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Statement */}
        <div className="bg-white rounded-3xl p-10 shadow-xl border-l-8 border-green-500">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Our Approach
          </h3>
          <p className="text-lg text-gray-700 leading-relaxed">
            Our approach emphasizes dependable staffing, timely placement, and alignment 
            with contract performance requirements.
          </p>
        </div>
      </div>
    </div>
  );
}