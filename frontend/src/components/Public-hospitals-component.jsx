import React from 'react';
import { Building, Heart, Stethoscope, CheckCircle } from 'lucide-react';

export default function PublicHospitals() {
  const supportAreas = [
    {
      icon: Building,
      title: "Inpatient and outpatient care facilities"
    },
    {
      icon: Heart,
      title: "Emergency and critical care departments"
    },
    {
      icon: Stethoscope,
      title: "Specialized clinical programs supported by public funding"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header with Background Image */}
        <div className="relative h-96 mb-16">
          <img 
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&h=400&fit=crop" 
            alt="Hospital building"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/70 flex items-center">
            <div className="px-8 md:px-16 max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Public Hospitals & Health Systems
              </h1>
              <p className="text-xl text-gray-200 leading-relaxed">
                Supporting institutions that operate under government oversight and public funding models
              </p>
            </div>
          </div>
        </div>

        <div className="px-8 md:px-16 pb-16">
          {/* Content Section */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Alikair supports public hospitals and health systems that operate under government oversight 
                  and public funding models. We understand the staffing challenges faced by these institutions, 
                  including workforce shortages, credentialing requirements, and continuity-of-care obligations.
                </p>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Our staffing solutions are structured to support:
                </h2>
                
                <div className="space-y-4">
                  {supportAreas.map((area, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="flex-shrink-0 w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center">
                        <area.icon className="w-6 h-6 text-white" strokeWidth={2} />
                      </div>
                      <p className="text-gray-700 pt-2 font-medium">
                        {area.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="bg-gray-900 rounded-2xl p-8 text-white sticky top-8">
                <CheckCircle className="w-12 h-12 mb-4 text-green-400" strokeWidth={2} />
                <h3 className="text-xl font-bold mb-4">
                  Our Commitment
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  We work to ensure that staffing placements align with operational needs, 
                  compliance standards, and patient care requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}