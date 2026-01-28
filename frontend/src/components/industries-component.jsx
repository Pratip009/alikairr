import React from 'react';
import { Shield, Building2, FileCheck, Users } from 'lucide-react';

export default function IndustriesServed() {
  const features = [
    {
      icon: Shield,
      label: "Regulatory Excellence",
      description: "Full compliance with government standards"
    },
    {
      icon: Building2,
      label: "Public Sector Focus",
      description: "Exclusively serving government entities"
    },
    {
      icon: FileCheck,
      label: "Contract Frameworks",
      description: "Established procurement processes"
    },
    {
      icon: Users,
      label: "Continuity of Care",
      description: "Reliable operational support"
    }
  ];

  return (
    <div className="min-h-screen bg-white py-16 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section with Image */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
              OUR EXPERTISE
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Industries & Clients Served
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              Alikair provides healthcare staffing and recruiting services exclusively to public-sector 
              and government-aligned organizations. Our experience is focused on environments where 
              regulatory compliance, continuity of care, and operational reliability are critical.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              We work within established procurement frameworks and contract structures to support 
              healthcare delivery across publicly funded and government-supported programs.
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-3xl transform rotate-3"></div>
            <img 
              src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&h=600&fit=crop" 
              alt="Healthcare professionals"
              className="relative rounded-3xl shadow-2xl w-full h-96 object-cover"
            />
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-4 shadow-lg">
                <feature.icon className="w-7 h-7 text-blue-600" strokeWidth={2} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {feature.label}
              </h3>
              <p className="text-sm text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Key Emphasis */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-center">
          <p className="text-xl text-white font-medium italic">
            Our services are intentionally aligned with public health systems 
            and contract-based healthcare operations.
          </p>
        </div>
      </div>
    </div>
  );
}