import React from 'react';
// FIX: Added Variants to the import to correctly type motion variants.
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate, Variants } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Play, Star, Sparkles, TrendingUp } from 'lucide-react';
import { Button, NeonCard, SectionHeading } from '../components/ui';
import { PageRoutes } from '../types';

const PromoBanner = () => (
  <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-8 md:p-10 shadow-2xl border border-slate-700 max-w-4xl mx-auto my-16 transform rotate-1 hover:rotate-0 transition-transform duration-500 group">
    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse group-hover:opacity-30 transition-opacity"></div>
    <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse group-hover:opacity-30 transition-opacity"></div>
    
    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="text-center md:text-left">
        <div className="inline-block px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-xs font-bold mb-3 border border-cyan-500/30 uppercase tracking-wider">
          Limited Time Offer
        </div>
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Buy <span className="text-cyan-400">1</span>, Get <span className="text-cyan-400">3</span> Free
        </h3>
        <p className="text-slate-300 max-w-md">
          Purchase any core service package this week and get three complimentary social media assets or thumbnail designs.
        </p>
      </div>
      <div className="flex-shrink-0">
         <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 flex items-center justify-center relative shadow-[0_0_30px_rgba(6,182,212,0.3)]">
            <Sparkles className="text-yellow-400 w-10 h-10 animate-spin-slow" />
         </div>
      </div>
    </div>
  </div>
);

const Hero = () => {
  const navigate = useNavigate();
  
  // Mouse tracking logic for interactive effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    mouseX.set((clientX - left) / width);
    mouseY.set((clientY - top) / height);
  }

  // Smooth out the mouse values
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // Create dynamic gradient position
  const gradientX = useTransform(springX, value => `${value * 100}%`);
  const gradientY = useTransform(springY, value => `${value * 100}%`);
  const spotlight = useMotionTemplate`radial-gradient(800px circle at ${gradientX} ${gradientY}, rgba(6,182,212,0.15), transparent 80%)`;

  // Parallax movement for elements
  const moveX = useTransform(springX, [0, 1], [-20, 20]);
  const moveY = useTransform(springY, [0, 1], [-20, 20]);
  const moveXReverse = useTransform(springX, [0, 1], [20, -20]);
  const moveYReverse = useTransform(springY, [0, 1], [20, -20]);

  // Stagger variants for text
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  // FIX: Explicitly typed `itemVariants` with `Variants` to fix type inference issue with the `ease` property.
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section 
      className="relative px-6 py-20 md:py-32 overflow-hidden min-h-[90vh] flex items-center justify-center"
      onMouseMove={handleMouseMove}
    >
      {/* Dynamic Background */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ background: spotlight }}
      />
      
      {/* Floating Ambient Shapes */}
      <motion.div 
        style={{ x: moveX, y: moveY }}
        className="absolute top-0 right-0 md:right-20 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-3xl -z-10"
      />
      <motion.div 
        style={{ x: moveXReverse, y: moveYReverse }}
        className="absolute bottom-0 left-0 md:left-20 w-80 h-80 bg-cyan-500/10 dark:bg-cyan-500/20 rounded-full blur-3xl -z-10"
      />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10 w-full">
        {/* Text Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            variants={itemVariants}
            className="inline-block px-4 py-1.5 mb-6 border border-cyan-500/30 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-medium text-sm backdrop-blur-sm"
          >
            Future-Ready Creative Agency
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold leading-tight text-slate-900 dark:text-white mb-6 tracking-tight"
          >
            We Design <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 animate-gradient-x">
              The Future
            </span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-slate-500 dark:text-slate-400 mb-8 max-w-lg leading-relaxed"
          >
            A full-service creative agency specializing in video editing, branding, and high-impact digital content.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap gap-4"
          >
            <Button onClick={() => navigate(PageRoutes.CONTACT)} icon className="shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40">
              Start Project
            </Button>
            <Button variant="outline" onClick={() => navigate(PageRoutes.SERVICES)}>
              View Services
            </Button>
          </motion.div>
        </motion.div>

        {/* Visual Content (Interactive Card) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: "spring", delay: 0.2 }}
          style={{ x: moveXReverse, y: moveYReverse }}
          className="relative perspective-1000"
        >
          <div className="relative aspect-square md:aspect-[4/3] bg-gradient-to-br from-slate-50/50 to-white/50 dark:from-slate-800/50 dark:to-slate-900/50 backdrop-blur-xl rounded-3xl border border-white/60 dark:border-slate-700 shadow-2xl flex items-center justify-center overflow-hidden">
             {/* Abstract Geometric Art */}
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(6,182,212,0.1),transparent)]"></div>
             <motion.div 
               animate={{ y: [0, -20, 0], opacity: [0.3, 0.5, 0.3] }}
               transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
               className="w-48 h-48 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 blur-2xl opacity-40 absolute top-1/4 left-1/4"
             />
             
             <div className="relative z-10 grid grid-cols-2 gap-4 p-8 w-full h-full opacity-90">
                {/* Floating UI Elements */}
                <motion.div 
                   style={{ y: moveY }}
                   className="bg-white/80 dark:bg-slate-900/80 backdrop-blur rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col justify-between transform translate-y-8 hover:scale-105 transition-transform duration-300"
                >
                    <div className="w-10 h-10 rounded-full bg-cyan-100 dark:bg-cyan-900/50 flex items-center justify-center text-cyan-600 dark:text-cyan-400 mb-2">
                        <Play size={20} fill="currentColor" />
                    </div>
                    <div className="h-2 w-20 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
                    <div className="h-2 w-12 bg-slate-100 dark:bg-slate-800 rounded"></div>
                </motion.div>
                
                <motion.div 
                   style={{ y: moveX }}
                   className="bg-white/80 dark:bg-slate-900/80 backdrop-blur rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col justify-between transform -translate-y-4 hover:scale-105 transition-transform duration-300"
                >
                     <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-2">
                        <TrendingUp size={20} />
                    </div>
                     <div className="space-y-2">
                        <div className="h-16 w-full bg-slate-50 dark:bg-slate-800 rounded-lg overflow-hidden relative">
                             <div className="absolute bottom-0 left-0 w-full h-1/2 bg-purple-500/10"></div>
                             <div className="absolute bottom-0 left-2 w-1 h-8 bg-purple-400"></div>
                             <div className="absolute bottom-0 left-4 w-1 h-5 bg-purple-400/50"></div>
                             <div className="absolute bottom-0 left-6 w-1 h-10 bg-purple-400"></div>
                        </div>
                     </div>
                </motion.div>
                
                <div className="bg-slate-900 dark:bg-black text-white rounded-2xl p-4 shadow-xl col-span-2 flex items-center justify-between border border-slate-800 mt-auto hover:border-cyan-500/50 transition-colors duration-300">
                     <div>
                        <div className="text-xs text-slate-400 uppercase tracking-widest mb-1">Impact</div>
                        <div className="text-2xl font-bold">+240%</div>
                     </div>
                     <div className="h-10 w-10 border-2 border-cyan-500 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                        <ArrowRight size={16} className="text-cyan-400" />
                     </div>
                </div>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ProcessStep = ({ number, title, text }: { number: string; title: string; text: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="flex gap-4 group"
  >
    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold flex items-center justify-center border border-slate-200 dark:border-slate-700 group-hover:border-cyan-500 group-hover:text-cyan-500 transition-colors duration-300">
      {number}
    </div>
    <div>
      <h4 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white group-hover:text-cyan-500 transition-colors duration-300">{title}</h4>
      <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{text}</p>
    </div>
  </motion.div>
);

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Hero />
      
      <section className="px-6 py-12">
        <PromoBanner />
      </section>

      <section className="px-6 py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <SectionHeading 
            title="How We Work" 
            subtitle="A streamlined process designed for speed and quality." 
            center
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
             <ProcessStep 
               number="01" 
               title="Discovery" 
               text="We dive deep into your brand's core values and goals to align our creative strategy perfectly." 
             />
             <ProcessStep 
               number="02" 
               title="Creation" 
               text="Our team of expert designers and editors bring the vision to life with precision and flair." 
             />
             <ProcessStep 
               number="03" 
               title="Delivery" 
               text="We deliver high-fidelity assets ready for launch, with revisions to ensure 100% satisfaction." 
             />
          </div>
        </div>
      </section>

      <section className="px-6 py-20 relative overflow-hidden">
         {/* Background accent for bottom CTA */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyan-500/5 blur-[100px] -z-10 rounded-full"></div>
         
         <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 dark:text-white">Ready to elevate your brand?</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8 text-lg">Join the hundreds of brands that have transformed their digital presence with GraxxSocials.</p>
            <Button 
              onClick={() => navigate(PageRoutes.CONTACT)} 
              icon 
              className="px-8 py-4 text-lg shadow-xl shadow-cyan-500/10"
            >
              Book a Meeting
            </Button>
         </div>
      </section>
    </div>
  );
}