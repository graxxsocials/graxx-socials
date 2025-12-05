import React from 'react';
import { SectionHeading, NeonCard, Button } from '../components/ui';
import { useNavigate } from 'react-router-dom';
import { PageRoutes } from '../types';
import { services } from '../data';

export default function Services() {
  const navigate = useNavigate();
  const coreServices = services.filter(s => s.category === 'core');
  const otherServices = services.filter(s => s.category === 'other');

  return (
    <div className="pt-12 pb-20 px-6 max-w-7xl mx-auto">
      <SectionHeading 
        title="Our Expertise" 
        subtitle="Comprehensive creative solutions tailored to modern brands."
        center
      />

      {/* Core Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {coreServices.map((service, idx) => (
          <NeonCard 
            key={service.id} 
            delay={idx * 0.1} 
            className="h-full flex flex-col group"
            onClick={() => navigate(`/services/${service.id}`)}
          >
            <div className={`
              w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300
              ${service.theme === 'purple' ? 'bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 group-hover:bg-purple-500 group-hover:text-white' : ''}
              ${service.theme === 'blue' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:bg-blue-500 group-hover:text-white' : ''}
              ${service.theme === 'cyan' ? 'bg-cyan-50 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white' : ''}
            `}>
              <service.icon size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{service.title}</h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed flex-grow">{service.description}</p>
            <div className="mt-6 flex items-center text-sm font-semibold text-slate-400 dark:text-slate-500 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
              Learn More <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </NeonCard>
        ))}
      </div>

      {/* Other Services Section */}
      <div className="bg-slate-900 dark:bg-black rounded-3xl p-8 md:p-16 text-center shadow-2xl relative overflow-hidden border border-slate-800">
        {/* Decorative background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-3xl bg-cyan-500/10 blur-3xl rounded-full pointer-events-none"></div>

        <h2 className="text-3xl font-bold text-white mb-12 relative z-10">
          Other Capabilities
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {otherServices.map((service) => (
            <div 
              key={service.id} 
              onClick={() => navigate(`/services/${service.id}`)}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-sm cursor-pointer group"
            >
              <div className={`flex justify-center mb-4 transition-colors ${
                  service.theme === 'purple' ? 'text-purple-400' : 
                  service.theme === 'blue' ? 'text-blue-400' : 'text-cyan-400'
              }`}>
                <service.icon size={28} />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">{service.title}</h4>
              <p className="text-slate-400 text-sm mb-4">{service.description}</p>
              <div className="text-xs text-slate-500 group-hover:text-white transition-colors">View Details</div>
            </div>
          ))}
        </div>

        <div className="mt-12 relative z-10">
          <Button onClick={() => navigate(PageRoutes.CONTACT)} className="bg-white text-slate-900 hover:bg-cyan-50 hover:text-cyan-900">
            Request a Quote
          </Button>
        </div>
      </div>
    </div>
  );
}