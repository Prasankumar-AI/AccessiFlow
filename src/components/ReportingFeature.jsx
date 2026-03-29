import React from 'react';
import { motion } from 'framer-motion';
import { Download, TableProperties, Network, FileSpreadsheet, ListChecks } from 'lucide-react';
import * as XLSX from 'xlsx';

export default function ReportingFeature() {
  const handleDownloadSample = () => {
    const sheetData = [
      ["Audit Date", new Date().toLocaleString()],
      ["Target URL", "https://accessiflow.org"],
      ["Overall Health Score", "85%"],
      [],
      ["Severity", "Element Code", "Detected Issue", "WCAG Guideline", "Deduplicated"],
      ["Critical", "<img src='logo.png'>", "Missing alt attribute", "1.1.1", "Yes"],
      ["High", "<button class='nav-item'>", "Contrast ratio 3.2:1 (Requires 4.5:1)", "1.4.3", "Yes"],
      ["Medium", "<div onClick={...}>", "Missing interactive role (button/link)", "4.1.2", "No"],
      ["Low", "<h1>", "Skipped heading level (H1 to H3)", "1.3.1", "Yes"],
      ["Manual", "NVDA Virtual Cursor", "Focus trap detected in navigation modal", "2.1.2", "Yes"]
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
    worksheet['!cols'] = [{ wch: 15 }, { wch: 30 }, { wch: 45 }, { wch: 15 }, { wch: 15 }];
    
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sample Audit");
    
    XLSX.writeFile(workbook, `accessiflow-sample-report.xlsx`);
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-24 relative z-20 overflow-hidden">
      
      <div className="flex flex-col lg:flex-row items-center gap-16">
        
        {/* Visual Graphic Representation */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 relative flex justify-center items-center"
        >
          {/* Abstract background gradient */}
          <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent blur-[100px] rounded-full" />
          
          {/* The "Excel" Visual */}
          <div className="relative glass-panel rounded-xl border border-white/20 p-2 shadow-2xl w-full max-w-md transform rotate-2 hover:rotate-0 transition-transform duration-500">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3 px-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="text-xs text-white/50 font-mono">master-audit-v1.xlsx</span>
            </div>
            
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex gap-2">
                  <div className="h-4 w-8 rounded-sm bg-white/10" />
                  <div className="h-4 w-1/4 rounded-sm bg-brandBlue/30" />
                  <div className="h-4 w-1/2 rounded-sm bg-green-400/20" />
                  <div className="h-4 w-1/4 rounded-sm bg-white/5" />
                </div>
              ))}
              <div className="pt-4 flex justify-between items-center px-1">
                <span className="text-xs font-semibold text-emerald-400">VPAT Ready</span>
                <span className="text-[10px] text-white/40">Auto-deduplicated</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Copy / Content */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:w-1/2 flex flex-col gap-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/10 text-accent text-sm font-semibold self-start">
            <TableProperties className="w-4 h-4" /> The Master Audit System
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            One Click. <br/> <span className="text-white/60">A Consolidated View.</span>
          </h2>
          
          <p className="text-lg text-white/70">
            Export a comprehensive, executive-ready Excel sheet. The Master Report intelligently merges data across all paradigms.
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <li className="flex items-start gap-3 glass-panel p-4 rounded-lg">
              <Network className="w-5 h-5 text-brandBlue mt-0.5" />
              <div>
                <strong className="block text-white">Auto-Deduplication</strong>
                <span className="text-sm text-white/50">Smart merge logic</span>
              </div>
            </li>
            <li className="flex items-start gap-3 glass-panel p-4 rounded-lg">
              <ListChecks className="w-5 h-5 text-green-400 mt-0.5" />
              <div>
                <strong className="block text-white">WCAG Mapping</strong>
                <span className="text-sm text-white/50">Lines directly to 2.1 AA</span>
              </div>
            </li>
            <li className="flex items-start gap-3 glass-panel p-4 rounded-lg sm:col-span-2">
              <FileSpreadsheet className="w-5 h-5 text-accent mt-0.5" />
              <div>
                <strong className="block text-white">Shareable Exports (CSV/XLSX)</strong>
                <span className="text-sm text-white/50">Merge automated (IBM) and manual (NVDA/VoiceOver) sessions into one VPAT document.</span>
              </div>
            </li>
          </ul>

          <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
            <span className="text-white/40 text-sm">Download sample report</span>
            <button onClick={handleDownloadSample} aria-label="Download excel audit" className="p-3 bg-brandBlue hover:bg-brandBlue/90 rounded-full transition-colors focus:ring-2 focus:ring-brandBlue/50 shadow-[0_0_15px_rgba(0,118,214,0.4)]">
              <Download className="w-5 h-5 text-white" />
            </button>
          </div>

        </motion.div>
        
      </div>
    </section>
  );
}
