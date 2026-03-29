import React from 'react';
import { Mail, MessageSquare } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import Hero from '../components/Hero';
import FeatureGrid from '../components/FeatureGrid';
import ToolingTable from '../components/ToolingTable';
import ReportingFeature from '../components/ReportingFeature';

export default function LandingPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Cinematic/Futuristic Backgrounds */}
      <div className="absolute inset-0 bg-grid pointer-events-none z-0" />
      <div className="absolute top-[-100px] left-[-200px] w-[500px] h-[500px] bg-brandBlue opacity-20 blur-[150px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-[-200px] right-[-100px] w-[600px] h-[600px] bg-accent opacity-10 blur-[150px] rounded-full pointer-events-none z-0" />
      
      <main className="relative z-10 w-full flex flex-col items-center">
        <Hero />
        <FeatureGrid />
        <ToolingTable />
        <ReportingFeature />
      </main>

      <footer className="w-full py-12 mt-24 border-t border-white/10 text-center relative z-10 flex flex-col items-center gap-6">
        {/* Contact Links */}
        <div className="flex flex-col items-center gap-3">
          <p className="text-white/70 font-semibold tracking-wider uppercase text-xs">Contact Us</p>
          <div className="flex gap-4">
            <a href="mailto:Prasan.nariboina@gmail.com" aria-label="Email Prasan Kumar" className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-brandBlue transition-all">
              <Mail className="w-5 h-5" />
            </a>
            <a href="https://github.com/Prasankumar-AI" target="_blank" rel="noreferrer" aria-label="GitHub Profile" className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all">
              <FaGithub className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/prasanofficial/" target="_blank" rel="noreferrer" aria-label="LinkedIn Profile" className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-[#0a66c2] transition-all">
              <FaLinkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="text-sm text-white/50 space-y-2">
          <p>&copy; 2026 AI Accessibility Tech. Built with Accessiflow UX.</p>
          <p className="tracking-widest uppercase text-[10px] font-semibold text-white/30">Developed by Prasan Kumar</p>
        </div>
      </footer>

      {/* Floating Chat Widget */}
      <button 
        aria-label="Chat with us"
        className="fixed bottom-6 right-6 p-4 rounded-full bg-brandBlue text-white shadow-[0_0_20px_rgba(0,118,214,0.4)] hover:shadow-[0_0_30px_rgba(0,118,214,0.6)] hover:scale-105 transition-all z-50 group flex items-center justify-center"
      >
        <MessageSquare className="w-6 h-6 group-hover:animate-pulse" />
      </button>
    </div>
  );
}
