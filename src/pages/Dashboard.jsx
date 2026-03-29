import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Globe, FileText, Download, Activity, AlertTriangle, CheckCircle, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('web');
  const [url, setUrl] = useState('');
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [results, setResults] = useState(null);

  const startScan = (e) => {
    e.preventDefault();
    if (!url) return;
    setScanning(true);
    setScanProgress(0);
    setResults(null);
  };

  // Simulate scanning progress
  useEffect(() => {
    if (scanning) {
      const interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setScanning(false);
            setResults({
              health: 72,
              issues: [
                { severity: 'Critical', element: '<img src="banner.jpg">', error: 'Missing alt attribute', wcag: '1.1.1' },
                { severity: 'High', element: '<button class="btn-primary">', error: 'Contrast ratio 3.2:1 (Requires 4.5:1)', wcag: '1.4.3' },
                { severity: 'Medium', element: '<div onClick={...}>', error: 'Missing interactive role (button/link)', wcag: '4.1.2' },
                { severity: 'Low', element: '<h1>', error: 'Skipped heading level (H1 to H3)', wcag: '1.3.1' }
              ]
            });
            return 100;
          }
          // Increment randomly to feel like real analysis
          return prev + Math.floor(Math.random() * 8) + 2;
        });
      }, 300);
      return () => clearInterval(interval);
    }
  }, [scanning]);

  const downloadReport = () => {
    if (!results) return;
    
    // Create sheet data matching Master Audit specs
    const sheetData = [
      ["Audit Date", new Date().toLocaleString()],
      ["Target URL", url],
      ["Overall Health Score", `${results.health}%`],
      [],
      ["Severity", "Element Code", "Detected Issue", "WCAG Guideline", "Deduplicated"]
    ];

    results.issues.forEach(issue => {
      sheetData.push([issue.severity, issue.element, issue.error, issue.wcag, "Yes"]);
    });

    const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
    
    // Column Widths
    worksheet['!cols'] = [{ wch: 15 }, { wch: 30 }, { wch: 45 }, { wch: 15 }, { wch: 15 }];
    
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "AccessiFlow Audit");
    
    // Generate buffer and trigger download
    XLSX.writeFile(workbook, `accessiflow-audit-${new Date().getTime()}.xlsx`);
  };

  return (
    <div className="min-h-screen bg-primary flex text-textLight font-sans overflow-hidden">
      {/* Background cyber grid */}
      <div className="absolute inset-0 bg-grid pointer-events-none z-0 opacity-50" />
      <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-brandBlue opacity-20 blur-[150px] rounded-full pointer-events-none z-0" />
      
      {/* Sidebar */}
      <aside className="relative z-10 w-64 border-r border-white/10 bg-black/40 backdrop-blur-md flex flex-col pt-8">
        <div 
          className="px-6 pb-8 border-b border-white/10 cursor-pointer flex items-center gap-2 group"
          onClick={() => navigate('/')}
        >
          <Activity className="w-6 h-6 text-brandBlue group-hover:animate-pulse" />
          <span className="font-bold text-lg tracking-wide">AccessiFlow</span>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-2">
          <button 
            onClick={() => setActiveTab('web')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'web' ? 'bg-brandBlue/20 text-brandBlue border border-brandBlue/30' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
          >
            <Globe className="w-5 h-5" /> Web Scanner
          </button>
          <button 
            onClick={() => setActiveTab('pdf')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'pdf' ? 'bg-brandBlue/20 text-brandBlue border border-brandBlue/30' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
          >
            <FileText className="w-5 h-5" /> PDF Suite
          </button>
          <button 
            onClick={() => setActiveTab('master')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'master' ? 'bg-brandBlue/20 text-brandBlue border border-brandBlue/30' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
          >
            <LayoutDashboard className="w-5 h-5" /> Master Audit
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex flex-col h-screen overflow-y-auto">
        <header className="h-20 border-b border-white/10 px-8 flex items-center justify-between bg-black/20 backdrop-blur-sm">
          <h2 className="text-xl font-semibold capitalize flex items-center gap-2">
            {activeTab === 'web' && <><Globe className="text-brandBlue w-5 h-5"/> Live Web Auditor</>}
            {activeTab === 'pdf' && <><FileText className="text-brandBlue w-5 h-5"/> PDF Remediation Center</>}
            {activeTab === 'master' && <><LayoutDashboard className="text-brandBlue w-5 h-5"/> The Master Reporting Suite</>}
          </h2>
          {results && activeTab === 'web' && (
            <button 
              onClick={downloadReport}
              className="px-4 py-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-emerald-500/20 transition-all focus:ring-2 focus:ring-emerald-500/50"
            >
              <Download className="w-4 h-4" /> Export Excel Audit
            </button>
          )}
        </header>

        <div className="flex-1 p-8 max-w-5xl mx-auto w-full">
          {/* WEB SCANNER VIEW */}
          {activeTab === 'web' && (
            <div className="space-y-8">
              {/* URL Input */}
              <motion.form 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={startScan}
                className="glass-panel p-2 rounded-2xl flex items-center focus-within:ring-2 focus-within:ring-brandBlue/50 transition-shadow"
              >
                <div className="pl-4 pr-2 py-3 text-white/50">
                  <Search className="w-5 h-5" />
                </div>
                <input 
                  type="url" 
                  required
                  placeholder="https://accessiflow.org" 
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  disabled={scanning}
                  className="flex-1 bg-transparent border-none outline-none text-lg text-white placeholder:text-white/30 px-2"
                />
                <button 
                  type="submit"
                  disabled={scanning || !url}
                  className="px-6 py-3 bg-accent text-white rounded-xl font-semibold hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {scanning ? 'Initializing...' : 'Run Deep Scan'}
                </button>
              </motion.form>

              {/* Scanning State */}
              {scanning && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="glass-panel p-8 rounded-2xl flex flex-col items-center justify-center min-h-[300px]"
                >
                  <div className="relative w-32 h-32 mb-6">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="64" cy="64" r="60" stroke="rgba(255,255,255,0.1)" strokeWidth="8" fill="none" />
                      <circle 
                        cx="64" cy="64" r="60" 
                        stroke="#0076d6" strokeWidth="8" fill="none" 
                        strokeDasharray="377" 
                        strokeDashoffset={377 - (377 * scanProgress) / 100} 
                        className="transition-all duration-300 ease-out"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold">{scanProgress}%</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-brandBlue animate-pulse">Running AI-Powered WCAG 2.1 AA Analysis...</h3>
                  <p className="text-white/50 text-sm">Validating ARIA trees, Contrast Ratios, and Keyboard Focus Traps on <span className="text-white">{url}</span></p>
                </motion.div>
              )}

              {/* Results State */}
              {results && !scanning && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  {/* Health Score Card */}
                  <div className="glass-panel p-6 rounded-2xl flex items-center gap-6">
                    <div className="p-4 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500">
                      <AlertTriangle className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-1">A11y Health Score: {results.health}%</h3>
                      <p className="text-white/60">We found {results.issues.length} critical to moderate issues that need your attention.</p>
                    </div>
                  </div>

                  {/* Issues List */}
                  <div className="glass-panel p-6 rounded-2xl">
                    <h3 className="text-lg font-semibold mb-6 border-b border-white/10 pb-4">Detected Violations</h3>
                    <div className="space-y-4">
                      {results.issues.map((issue, i) => (
                        <div key={i} className="flex flex-col md:flex-row gap-4 p-4 rounded-xl bg-white/5 border border-white/10 items-start">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shrink-0
                            ${issue.severity === 'Critical' ? 'bg-red-500/20 text-red-400' : 
                              issue.severity === 'High' ? 'bg-orange-500/20 text-orange-400' : 
                              issue.severity === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' : 
                              'bg-brandBlue/20 text-brandBlue'}
                          `}>
                            {issue.severity}
                          </span>
                          <div className="flex-1">
                            <h4 className="font-medium text-white mb-1">{issue.error}</h4>
                            <code className="text-sm text-brandBlue bg-black/30 px-2 py-1 rounded">{issue.element}</code>
                          </div>
                          <span className="shrink-0 text-sm text-white/40">WCAG {issue.wcag}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          )}

          {/* MOCK PLACEHOLDERS FOR OTHER TABS */}
          {activeTab === 'pdf' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-panel p-12 rounded-2xl text-center border-dashed border-2 border-white/20">
              <FileText className="w-16 h-16 mx-auto mb-4 text-white/30" />
              <h3 className="text-2xl font-semibold mb-2">Drop a PDF Document Here</h3>
              <p className="text-white/50">We will instantly validate Tag Structures and Reading Order flows.</p>
              <button className="mt-6 px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all font-medium">Browse Files</button>
            </motion.div>
          )}

          {activeTab === 'master' && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-panel p-12 rounded-2xl flex flex-col items-center">
             <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-6">
                <CheckCircle className="w-10 h-10 text-emerald-400" />
             </div>
             <h3 className="text-2xl font-semibold mb-2">Master Audit Ready</h3>
             <p className="text-white/50 max-w-md text-center mb-8">Your recent Web Scans and Manual NVDA test sessions have been successfully consolidated into the Master Audit database.</p>
             <button className="px-8 py-4 bg-brandBlue text-white rounded-xl hover:bg-brandBlue/90 transition-all font-semibold shadow-[0_0_20px_rgba(0,118,214,0.3)] hover:shadow-[0_0_30px_rgba(0,118,214,0.5)] flex items-center gap-2">
                <Download className="w-5 h-5" /> Generate Consolidated VPAT
             </button>
           </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
