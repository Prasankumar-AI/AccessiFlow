import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScanSearch, ArrowRight, ShieldCheck, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();
  const [issueCount, setIssueCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', purpose: '' });
  const [emailError, setEmailError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Simulate a live scan counting up
  useEffect(() => {
    const interval = setInterval(() => {
      setIssueCount((prev) => (prev < 342 ? prev + Math.floor(Math.random() * 5) + 1 : 342));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const handleEmailChange = (e) => {
    const val = e.target.value;
    setFormData({ ...formData, email: val });
    
    // Check if ends with generic domains
    const generics = ['@gmail.com', '@yahoo.com', '@hotmail.com', '@outlook.com', '@icloud.com'];
    if (generics.some(domain => val.toLowerCase().endsWith(domain))) {
      setEmailError('Please use a verifiable company domain.');
    } else {
      setEmailError('');
    }
  };

  const handleDemoSubmit = (e) => {
    e.preventDefault();
    if (emailError) return;
    setSubmitted(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setSubmitted(false);
      setFormData({ name: '', phone: '', email: '', purpose: '' });
    }, 2000);
  };

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
            className="group flex items-center gap-2 px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all shadow-[0_0_20px_rgba(255,79,82,0.3)] hover:shadow-[0_0_30px_rgba(255,79,82,0.5)] focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary"
            aria-label="Start Free Scan"
          >
            <ScanSearch className="w-5 h-5" />
            Start Free Scan
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="group flex items-center gap-2 px-8 py-4 bg-transparent border border-white/20 text-white font-semibold rounded-lg hover:bg-white/5 transition-all focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-primary"
            aria-label="Book a Demo"
          >
            Book a Demo
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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

      {/* Book a Demo Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-lg glass-panel p-8 rounded-2xl border border-white/20 shadow-2xl"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-white/50 hover:text-white bg-white/5 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
              
              <h2 className="text-3xl font-bold mb-2">Book a Demo</h2>
              <p className="text-white/60 mb-8">Schedule a walkthrough of the AccessiFlow enterprise suite.</p>

              {submitted ? (
                <div className="py-12 text-center text-emerald-400 flex flex-col items-center">
                  <ShieldCheck className="w-16 h-16 mb-4" />
                  <h3 className="text-2xl font-bold">Request Received</h3>
                  <p className="text-white/60 mt-2">Our technical team will reach out shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleDemoSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">Full Name</label>
                    <input 
                      type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-brandBlue"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">Contact Number</label>
                    <input 
                      type="tel" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-brandBlue"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">Company Email</label>
                    <input 
                      type="email" required value={formData.email} onChange={handleEmailChange}
                      className={`w-full bg-black/30 border rounded-lg px-4 py-3 justify-center text-white placeholder-white/30 focus:outline-none focus:ring-2 ${emailError ? 'border-red-500/50 focus:ring-red-500' : 'border-white/10 focus:ring-brandBlue'}`}
                      placeholder="jane@company.com"
                    />
                    {emailError && <p className="text-red-400 text-xs mt-1">{emailError}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">Primary Purpose</label>
                    <div className="relative">
                      <select 
                        required value={formData.purpose} onChange={e => setFormData({...formData, purpose: e.target.value})}
                        className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-brandBlue"
                      >
                        <option value="" disabled className="bg-primary text-white/50">Select an objective...</option>
                        <option value="wcag_audit" className="bg-primary">Comprehensive WCAG 2.1 Audit</option>
                        <option value="automated_cicd" className="bg-primary">CI/CD Pipeline Integration</option>
                        <option value="pdf_remediation" className="bg-primary">PDF Tagging & Remediation</option>
                        <option value="enterprise_pricing" className="bg-primary">Enterprise License Pricing</option>
                      </select>
                    </div>
                  </div>
                  <button 
                    type="submit" 
                    disabled={!!emailError}
                    className="w-full mt-4 py-4 bg-brandBlue text-white rounded-lg font-semibold hover:bg-brandBlue/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit Request
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
