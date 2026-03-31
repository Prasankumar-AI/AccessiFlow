import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScanSearch, ArrowRight, ShieldCheck, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();
  const [issueCount, setIssueCount] = useState(0);

  // Simulate a live scan counting up
  useEffect(() => {
    const interval = setInterval(() => {
      setIssueCount((prev) => (prev < 342 ? prev + Math.floor(Math.random() * 5) + 1 : 342));
    }, 50);
    return () => clearInterval(interval);
  }, []);


  return (
    <>
      <section className="relative w-full min-h-[90vh] flex flex-col justify-center items-center text-center px-4 pt-32 pb-20">
        
        {/* Live Banner */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8 inline-flex items-center gap-3 px-4 py-2 rounded-full border border-brandBlue/30 bg-brandBlue/10 text-brandBlue text-sm font-medium backdrop-blur-md"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brandBlue opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-brandBlue"></span>
          </span>
          A11y Issue Detection Agent: {issueCount} potential issues blocked
        </motion.div>

        {/* Main Headline */}
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-5xl leading-tight mb-6"
        >
          Achieve <span className="text-transparent bg-clip-text bg-gradient-to-r from-brandBlue to-blue-400">360° Digital Inclusivity</span> with AI-Powered Accessibility Testing
        </motion.h1>

        {/* Sub-headline */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-white/70 max-w-3xl mb-12"
        >
          From automated web scans to complex PDF remediation and manual screen-reader audits—ensure your digital products meet WCAG 2.1/2.2 AA standards with the industry’s most comprehensive toolkit.
        </motion.p>

        {/* CTAs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button 
            onClick={() => navigate('/dashboard')}
            className="group flex items-center gap-2 px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary"
            aria-label="A11y Audit"
          >
            <ScanSearch className="w-5 h-5" />
            A11y Audit
          </button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16 flex items-center gap-2 text-sm text-white/50"
        >
          <ShieldCheck className="w-4 h-4 text-green-400" />
          WCAG 2.1 & 2.2 AA Compliant
        </motion.div>
      </section>

    </>
  );
}
