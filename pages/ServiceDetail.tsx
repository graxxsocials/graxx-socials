import React from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui';
import { services } from '../data';
import { PageRoutes } from '../types';

export default function ServiceDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const service = services.find(s => s.id === id);

  if (!service) {
    return <Navigate to={PageRoutes.SERVICES} replace />;
  }

  // Helper to get theme-specific styles
  const getThemeStyles = (theme: string) => {
    switch (theme) {
      case 'purple':
        return {
          gradient: 'from-purple-500 to-indigo-600',
          lightBg: 'bg-purple-50 dark:bg-purple-900/10',
          text: 'text-purple-600 dark:text-purple-400',
          border: 'border-purple-200 dark:border-purple-800',
          shadow: 'shadow-purple-500/20'
        };
      case 'blue':
        return {
          gradient: 'from-blue-500 to-blue-700',
          lightBg: 'bg-blue-50 dark:bg-blue-900/10',
          text: 'text-blue-600 dark:text-blue-400',
          border: 'border-blue-200 dark:border-blue-800',
          shadow: 'shadow-blue-500/20'
        };
      case 'cyan':
      default:
        return {
          gradient: 'from-cyan-400 to-blue-500',
          lightBg: 'bg-cyan-50 dark:bg-cyan-900/10',
          text: 'text-cyan-600 dark:text-cyan-400',
          border: 'border-cyan-200 dark:border-cyan-800',
          shadow: 'shadow-cyan-500/20'
        };
    }
  };

  const themeStyle = getThemeStyles(service.theme);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative pt-12 pb-24 overflow-hidden">
         <div className={`absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l ${themeStyle.gradient} opacity-5 dark:opacity-10 -z-10 blur-3xl rounded-bl-full`}></div>
         
         <div className="max-w-7xl mx-auto px-6">
           <button 
             onClick={() => navigate(PageRoutes.SERVICES)}
             className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors mb-8 group"
           >
             <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
             Back to Services
           </button>

           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             <motion.div
               initial={{ opacity: 0, x: -30 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.6 }}
             >
               <div className={`inline-flex items-center justify-center p-3 rounded-xl mb-6 ${themeStyle.lightBg} ${themeStyle.text}`}>
                 <service.icon size={32} />
               </div>
               <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
                 {service.title}
               </h1>
               <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
                 {service.description}
               </p>
               <Button onClick={() => navigate(PageRoutes.CONTACT)} icon>
                 Book a Consultation
               </Button>
             </motion.div>

             <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.6, delay: 0.2 }}
               className={`relative aspect-square md:aspect-video rounded-3xl overflow-hidden shadow-2xl ${themeStyle.shadow} border border-white dark:border-slate-800`}
             >
                <div className={`absolute inset-0 bg-gradient-to-br ${themeStyle.gradient} opacity-90`}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="text-white/20">
                      <service.icon size={120} strokeWidth={0.5} />
                   </div>
                </div>
                <div className="absolute bottom-0 left-0 p-8 w-full bg-gradient-to-t from-slate-900/50 to-transparent">
                  <div className="text-white font-mono text-sm opacity-80">
                     SERVICE.ID // {service.id.toUpperCase()}
                  </div>
                </div>
             </motion.div>
           </div>
         </div>
      </section>

      {/* Details Section */}
      <section className="py-20 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            {/* Description Column */}
            <div className="md:col-span-2">
               <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">About this Service</h3>
               <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
                 {service.longDescription}
               </p>
               
               <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">What to Expect</h3>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                    <div className="font-bold text-slate-900 dark:text-white mb-2">Strategic Approach</div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Every project starts with a deep dive into your goals.</p>
                 </div>
                 <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                    <div className="font-bold text-slate-900 dark:text-white mb-2">Premium Quality</div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Industry-standard tools and expert craftsmanship.</p>
                 </div>
               </div>
            </div>

            {/* Features Sidebar */}
            <div className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-8 border border-slate-100 dark:border-slate-700 h-fit transition-colors">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">What's Included</h3>
              <ul className="space-y-4">
                {service.features?.map((feature, idx) => (
                  <motion.li 
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-3 text-slate-600 dark:text-slate-300"
                  >
                    <CheckCircle2 size={20} className={`flex-shrink-0 mt-0.5 ${themeStyle.text}`} />
                    <span className="text-sm font-medium">{feature}</span>
                  </motion.li>
                ))}
              </ul>
              
              <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Need something custom?</p>
                <button 
                  onClick={() => navigate(PageRoutes.CONTACT)}
                  className={`w-full py-3 rounded-xl font-medium border-2 transition-colors ${themeStyle.border} ${themeStyle.text} hover:bg-white dark:hover:bg-slate-900`}
                >
                  Contact Us
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-6">
        <div className={`max-w-5xl mx-auto rounded-3xl p-12 text-center text-white shadow-2xl overflow-hidden relative bg-gradient-to-r ${themeStyle.gradient}`}>
          <div className="relative z-10">
             <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your {service.title.toLowerCase()}?</h2>
             <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
               Book a meeting with our team to discuss your project requirements and get a custom quote.
             </p>
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <button 
                 onClick={() => navigate(PageRoutes.CONTACT)}
                 className="px-8 py-4 bg-white text-slate-900 rounded-full font-bold hover:bg-slate-100 transition-colors shadow-lg"
               >
                 Book a Meeting
               </button>
               <button 
                 onClick={() => navigate(PageRoutes.SERVICES)}
                 className="px-8 py-4 bg-transparent border border-white/30 text-white rounded-full font-bold hover:bg-white/10 transition-colors"
               >
                 View Other Services
               </button>
             </div>
          </div>
          
          {/* Decorative Circles */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white opacity-10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-black opacity-10 rounded-full blur-2xl"></div>
        </div>
      </section>
    </div>
  );
}