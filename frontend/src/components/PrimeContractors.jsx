import React from 'react';
import { FileText, Clock, Shield, Layers } from 'lucide-react';

export default function PrimeContractors() {
  const subcontractorSupport = [
    {
      icon: FileText,
      title: "Supplying healthcare personnel aligned with contract scopes"
    },
    {
      icon: Clock,
      title: "Meeting staffing timelines and performance periods"
    },
    {
      icon: Shield,
      title: "Supporting compliance and credentialing requirements"
    },
    {
      icon: Layers,
      title: "Integrating seamlessly into existing contract structures"
    }
  ];

  return (
    <div className="min-h-screen bg-white py-16 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-16">
          <div className="grid md:grid-cols-5 gap-0">
            <div className="md:col-span-3 p-10 md:p-16">
              <div className="inline-block px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-bold mb-6">
                PARTNERSHIP EXCELLENCE
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Prime Contractors & Government Contract Partners
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Alikair works closely with prime contractors delivering healthcare services under 
                government contracts. We operate as a reliable staffing partner, supporting contract 
                execution through compliant and qualified workforce placement.
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="px-4 py-2 bg-orange-100 rounded-full text-orange-800 font-semibold text-sm">
                  Responsive
                </div>
                <div className="px-4 py-2 bg-red-100 rounded-full text-red-800 font-semibold text-sm">
                  Documented
                </div>
                <div className="px-4 py-2 bg-orange-100 rounded-full text-orange-800 font-semibold text-sm">
                  Reliable
                </div>
              </div>
            </div>
            <div className="md:col-span-2 h-full min-h-96">
              <img 
                src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=800&fit=crop" 
                alt="Contract documents"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Support Cards Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our subcontractor support includes:
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-orange-500 to-red-500 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {subcontractorSupport.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-orange-500"
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                    <item.icon className="w-7 h-7 text-white" strokeWidth={2} />
                  </div>
                  <p className="text-lg text-gray-800 font-medium leading-relaxed pt-2">
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Image Section */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl p-10 text-white shadow-2xl">
            <h3 className="text-3xl font-bold mb-6">
              Understanding Regulated Environments
            </h3>
            <p className="text-lg leading-relaxed text-orange-50 mb-6">
              We understand the importance of responsiveness, documentation, and reliability when 
              supporting prime contractors in regulated healthcare environments.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-orange-100">Timely communication</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-orange-100">Complete documentation</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-orange-100">Consistent performance</span>
              </div>
            </div>
          </div>

          <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=600&fit=crop" 
              alt="Healthcare team meeting"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
            <div className="absolute bottom-8 left-8 right-8">
              <div className="bg-white rounded-2xl p-6 shadow-xl">
                <p className="text-gray-900 font-bold text-lg">
                  Seamless Integration with Prime Contractors
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}