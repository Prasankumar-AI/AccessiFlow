import React from 'react';
import { motion } from 'framer-motion';
import { Download, TableProperties, Network, FileSpreadsheet, ListChecks } from 'lucide-react';
import * as XLSX from 'xlsx';

export default function ReportingFeature() {
  const handleDownloadSample = () => {
    console.log('AccessiFlow: Exporting sample report...');
    try {
      // Sheet 1: Dashboard Summary
      const dashboardData = [
        ["AccessiFlow Master Audit Dashboard", ""],
        ["Version", "1.2.0"],
        ["", ""],
        ["Audit Summary", ""],
        ["Target URL", "https://cloud.ibm.com/status/security"],
        ["Scan Date", new Date().toLocaleString()],
        ["Overall Compliance Score", "92/100"],
        ["Total Defects Found", 5],
        ["", ""],
        ["Defect Severity Breakdown", ""],
        ["Critical", 1],
        ["High", 1],
        ["Medium", 2],
        ["Low", 1]
      ];

      const headers = [
        "URL", "Component", "Issue title/Summary", "Issue Description", 
        "Recommended Fix", "User Impact Statement", "WCAG Mapping", 
        "Level of Compliance", "Severity", "Test Tool"
      ];

      const defectsData = [
        headers,
        [
          "https://cloud.ibm.com/status/security", "Table Header", "Table has no headers", 
          "The table shows data but does not have any headers marked in the code. Same issue at History Page.", 
          "Ensure Provide Headers to the table so users able to understand context.", 
          "Users who rely on screen readers cannot understand the table. They hear data without knowing what it represents, causing confusion and making the table unusable.", 
          "1.3.1 - Info & Relationship", "A", "Medium", "IBM checker"
        ],
        [
          "https://cloud.ibm.com/status/security", "Navigation Menu", "Keyboard Trap", 
          "User cannot navigate out of the sub-menu using the Tab key.", 
          "Ensure that the focus is not trapped within the element and allow users to exit using keyboard.", 
          "Users who rely on keyboards cannot navigate the entire page efficiently, leading to a blocked experience.", 
          "2.1.2 - No Keyboard Trap", "A", "Critical", "Keyboard testing"
        ]
      ];

      const workbook = XLSX.utils.book_new();
      const dashboardSheet = XLSX.utils.aoa_to_sheet(dashboardData);
      XLSX.utils.book_append_sheet(workbook, dashboardSheet, "Visual Dashboard");
      
      const defectsSheet = XLSX.utils.aoa_to_sheet(defectsData);
      defectsSheet['!cols'] = [{ wch: 30 }, { wch: 20 }, { wch: 25 }, { wch: 40 }, { wch: 40 }, { wch: 40 }, { wch: 25 }, { wch: 15 }, { wch: 15 }, { wch: 20 }];
      XLSX.utils.book_append_sheet(workbook, defectsSheet, "Detailed Violations");
      
      console.log('AccessiFlow: Generating Workbook file...');
      XLSX.writeFile(workbook, `AccessiFlow-Sample-Report-v1.2.xlsx`);
      console.log('AccessiFlow: Export successful.');
    } catch (error) {
      console.error('AccessiFlow: Sample export failed', error);
      alert('Failed to export sample. Please check the console for details.');
    }
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
              <span className="text-xs text-white/50 font-mono">master-audit-v1.2.xlsx</span>
            </div>
            
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex gap-2">
                  <div className="h-4 w-8 rounded-sm bg-white/10" />
                  <div className="h-4 w-1/4 rounded-sm bg-accent/30" />
                  <div className="h-4 w-1/2 rounded-sm bg-accent/20" />
                  <div className="h-4 w-1/4 rounded-sm bg-white/5" />
                </div>
              ))}
              <div className="pt-4 flex justify-between items-center px-1">
                <span className="text-xs font-semibold text-accent">VPAT 2.5 Ready</span>
                <span className="text-[10px] text-white/40">Multi-Sheet Console</span>
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
            <TableProperties className="w-4 h-4" /> The Master Audit System v1.2
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            One Click. <br/> <span className="text-white/60">A Consolidated View.</span>
          </h2>
          
          <p className="text-lg text-white/70">
            Export a comprehensive, executive-ready Excel sheet. The Master Report intelligently merges automated IBM checks and manual screen-reader sessions.
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <li className="flex items-start gap-3 glass-panel p-4 rounded-lg">
              <Network className="w-5 h-5 text-accent mt-0.5" />
              <div>
                <strong className="block text-white">Auto-Deduplication</strong>
                <span className="text-sm text-white/50">Smart merge logic</span>
              </div>
            </li>
            <li className="flex items-start gap-3 glass-panel p-4 rounded-lg">
              <ListChecks className="w-5 h-5 text-accent mt-0.5" />
              <div>
                <strong className="block text-white">WCAG Mapping</strong>
                <span className="text-sm text-white/50">Lines directly to 2.2 AA</span>
              </div>
            </li>
            <li className="flex items-start gap-3 glass-panel p-4 rounded-lg sm:col-span-2">
              <FileSpreadsheet className="w-5 h-5 text-accent mt-0.5" />
              <div>
                <strong className="block text-white">Professional PDF/XLSX Exports</strong>
                <span className="text-sm text-white/50">High-fidelity reports with Compliance Scores and deep User Impact statements.</span>
              </div>
            </li>
          </ul>

          <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
            <span className="text-white/40 text-sm">Download sample v1.2 report</span>
            <button onClick={handleDownloadSample} aria-label="Download excel audit" className="p-3 bg-accent hover:bg-accent/90 rounded-full transition-all focus:ring-2 focus:ring-accent/50 shadow-[0_0_15px_rgba(168,85,247,0.4)]">
              <Download className="w-5 h-5 text-white" />
            </button>
          </div>

        </motion.div>
        
      </div>
    </section>
  );
}
