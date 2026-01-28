import React from 'react';
import { Building2, Users, Briefcase, Settings } from 'lucide-react';

export default function PublicInstitutions() {
  const experienceAreas = [
    {
      icon: Building2,
      title: "Public-sector healthcare programs",
      description: "Supporting comprehensive healthcare delivery"
    },
    {
      icon: Settings,
      title: "Institutional healthcare operations",
      description: "Ensuring operational continuity and excellence"
    },
    {
      icon: Users,
      title: "Administrative and support staffing needs",
      description: "Complete workforce solutions"
    },
    {
      icon: Briefcase,
      title: "Program-specific workforce requirements",
      description: "Tailored staffing for unique initiatives"
    }
  ];

  return (
    <div className="min-h-screen bg-white py-16 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop" 
                  alt="Government building"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/40 to-pink-900/40"></div>
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6">
                    <p className="text-purple-900 font-bold text-lg">
                      Supporting Healthcare Delivery & Administration
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 md:order-2">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Public Institutions & Healthcare Programs
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Alikair supports public institutions involved in healthcare delivery, administration, 
                and program management. This includes organizations responsible for managing healthcare 
                services within government-funded or publicly administered programs.
              </p>
            </div>
          </div>
        </div>

        {/* Experience Timeline */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
            Our experience includes supporting:
          </h2>
          
          <div className="space-y-6">
            {experienceAreas.map((area, index) => (
              <div
                key={index}
                className="flex items-start gap-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <area.icon className="w-8 h-8 text-white" strokeWidth={2} />
                  </div>
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {area.title}
                  </h3>
                  <p className="text-gray-600">
                    {area.description}
                  </p>
                </div>
                <div className="hidden md:block w-8 h-8 bg-purple-200 rounded-full flex-shrink-0 mt-4"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Emphasis Card */}
        <div className="relative overflow-hidden rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"></div>
          <div className="relative p-10 text-white">
            <div className="max-w-4xl">
              <h3 className="text-3xl font-bold mb-4">
                Workforce Continuity is Critical
              </h3>
              <p className="text-xl leading-relaxed text-purple-100">
                We understand the importance of maintaining workforce continuity within institutional 
                environments where service disruptions are not acceptable.
              </p>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mb-20"></div>
        </div>
      </div>
    </div>
  );
}