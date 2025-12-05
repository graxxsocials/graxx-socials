import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Sun, Moon, Instagram, Twitter, Linkedin, Youtube } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui';
import { PageRoutes } from '../types';

const LOGO_SRC = "graxxsocials logo.png";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="p-2 rounded-full text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { label: 'Home', path: PageRoutes.HOME },
    { label: 'Services', path: PageRoutes.SERVICES },
    { label: 'Contact', path: PageRoutes.CONTACT },
  ];

  const handleBookMeeting = () => {
    navigate(PageRoutes.CONTACT);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <NavLink to={PageRoutes.HOME} className="flex items-center gap-3 group">
          <motion.div
            animate={{ 
               rotate: [0, 5, -5, 0],
               y: [0, -2, 0]
            }}
            transition={{ 
               duration: 6, 
               repeat: Infinity, 
               ease: "easeInOut" 
            }}
            className="relative w-10 h-10 md:w-12 md:h-12"
          >
             <img 
               src={LOGO_SRC} 
               alt="GraxxSocials Logo" 
               className="w-full h-full object-contain rounded-full shadow-lg" 
             />
          </motion.div>
          <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
            Graxx<span className="text-cyan-500">Socials</span>
          </span>
        </NavLink>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-cyan-600 dark:hover:text-cyan-400 ${
                  isActive ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-300'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-2"></div>
          <ThemeToggle />
          <Button onClick={handleBookMeeting} className="ml-2 text-sm px-5 py-2">
            Book a Meeting
          </Button>
        </nav>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <button 
            className="text-slate-900 dark:text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 p-6 flex flex-col gap-4 shadow-xl">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-lg font-medium ${
                  isActive ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-300'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Button onClick={handleBookMeeting} className="w-full justify-center">
            Book a Meeting
          </Button>
        </div>
      )}
    </header>
  );
};

const SocialLink = ({ href, icon }: { href: string; icon: React.ReactNode }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-cyan-500 hover:text-white hover:-translate-y-1 transition-all duration-300"
  >
    {icon}
  </a>
);

const Footer = () => (
  <footer className="bg-slate-900 dark:bg-black text-slate-300 py-12 border-t border-slate-800">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="col-span-1 md:col-span-2">
        <div className="flex items-center gap-3 mb-4 text-white">
          <div className="w-10 h-10">
             <img 
               src={LOGO_SRC} 
               alt="GraxxSocials Logo" 
               className="w-full h-full object-contain rounded-full" 
             />
          </div>
          <span className="font-bold text-xl">GraxxSocials</span>
        </div>
        <p className="text-slate-400 max-w-sm mb-6">
          Elevating brands through futuristic design and strategic creativity. 
          We build the digital presence of tomorrow.
        </p>
        <div className="flex gap-3">
          <SocialLink href="https://instagram.com" icon={<Instagram size={18} />} />
          <SocialLink href="https://twitter.com" icon={<Twitter size={18} />} />
          <SocialLink href="https://linkedin.com" icon={<Linkedin size={18} />} />
          <SocialLink href="https://youtube.com" icon={<Youtube size={18} />} />
        </div>
      </div>
      
      <div>
        <h3 className="text-white font-semibold mb-4">Services</h3>
        <ul className="space-y-2 text-sm text-slate-400">
          <li>Video Editing</li>
          <li>Branding</li>
          <li>Web Design</li>
          <li>Strategy</li>
        </ul>
      </div>

      <div>
        <h3 className="text-white font-semibold mb-4">Contact</h3>
        <ul className="space-y-2 text-sm text-slate-400">
          <li>hello@graxxsocials.com</li>
          <li>+1 (555) 012-3456</li>
          <li>Los Angeles, CA</li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-slate-800 text-xs text-center text-slate-500">
      © {new Date().getFullYear()} GraxxSocials. All rights reserved.
    </div>
  </footer>
);

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col pt-20 transition-colors duration-300 bg-slate-50 dark:bg-slate-950">
      <Navigation />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};