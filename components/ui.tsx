import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
  icon?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, icon, className = '', ...props }) => {
  const baseStyle = "inline-flex items-center justify-center px-6 py-3 rounded-full font-medium transition-all duration-300 transform active:scale-95";
  
  const variants = {
    primary: "bg-slate-900 text-white dark:bg-cyan-500 dark:text-slate-900 hover:bg-cyan-500 hover:text-white dark:hover:bg-cyan-400 dark:hover:text-slate-900 shadow-lg hover:shadow-neon-cyan border border-transparent",
    secondary: "bg-cyan-100 text-cyan-900 dark:bg-cyan-900/30 dark:text-cyan-300 hover:bg-cyan-200 dark:hover:bg-cyan-900/50 border border-cyan-200 dark:border-cyan-800",
    outline: "bg-transparent border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400 dark:hover:border-cyan-400"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
      {icon && <ArrowRight className="ml-2 w-4 h-4" />}
    </button>
  );
};

interface NeonCardProps { 
  children: React.ReactNode; 
  className?: string; 
  delay?: number;
  onClick?: () => void;
}

export const NeonCard: React.FC<NeonCardProps> = ({ children, className = '', delay = 0, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ 
        y: -8, 
        boxShadow: "0 20px 40px -10px rgba(34, 211, 238, 0.3)",
      }}
      onClick={onClick}
      className={`
        bg-white dark:bg-slate-900 
        border border-slate-100 dark:border-slate-800 
        rounded-2xl p-6 shadow-sm 
        hover:border-cyan-400 dark:hover:border-cyan-500 
        hover:shadow-neon-cyan
        transition-all duration-300 
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};

export const SectionHeading: React.FC<{ title: string; subtitle?: string; center?: boolean }> = ({ title, subtitle, center = false }) => (
  <div className={`mb-12 ${center ? 'text-center' : ''}`}>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight"
    >
      {title}
      <span className="text-cyan-500">.</span>
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);