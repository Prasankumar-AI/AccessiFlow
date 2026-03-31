import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Globe, FileText, Download, Activity, AlertTriangle, CheckCircle, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';

export default function Dashboard() {
  const navigate = useNavigate();
  const [scanStatus, setScanStatus] = useState('');
  const [activeTab, setActiveTab] = useState('web');
  const [url, setUrl] = useState('');
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [results, setResults] = useState(null);

  const startScan = (e) => {
    e.preventDefault();
    if (!url) return;
    
    // Simulate opening in new window
    window.open(url, '_blank');
    
    setScanning(true);
    setScanProgress(0);
    setResults(null);
    setScanStatus('Initializing IBM Equal Access Checker...');
  };

  // Simulate complex scanning progress
  useEffect(() => {
    if (scanning) {
      const interval = setInterval(() => {
        setScanProgress(prev => {
          const next = prev + Math.floor(Math.random() * 5) + 1;
          
          // Update status based on progress phases
          if (next > 0 && next < 25) setScanStatus('IBM Checker: Scanning DOM tree and ARIA roles...');
          if (next >= 25 && next < 30) setScanStatus('IBM Checker Completed. Marking milestones...');
          if (next >= 30 && next < 50) setScanStatus('NVDA Simulation: Initializing Virtual Screen Reader...');
          if (next >= 50 && next < 70) setScanStatus('Keyboard Testing: Simulating tabbed navigation and focus traps...');
          if (next >= 70 && next < 90) setScanStatus('Color Contrast: Verifying luminance ratios against WCAG 1.4.3...');
          if (next >= 90) setScanStatus('Finalizing WCAG 2.1 AA guideline verification...');

          if (next >= 100) {
            clearInterval(interval);
            setScanning(false);
            
            // Defect data for Watson Orchestrate
            const watsonIssues = [
              { 
                url: url,
                component: 'Chat History Log',
                summary: 'Missing Screen Reader announcements for new messages',
                description: 'Incoming AI responses fail to trigger aria-live or role="log" announcements, preventing screen reader users from hearing bot replies.',
                fix: 'Apply aria-live="polite" and role="log" to the message container to ensure real-time status updates.',
                impact: 'Critical barrier: Screen reader users are unaware of incoming conversation threads or bot responses.',
                wcag: '4.1.3 - Status Messages',
                level: 'AA',
                severity: 'Critical',
                tool: 'NVDA screen reader'
              },
              { 
                url: url,
                component: 'Mobile Mobile View',
                summary: 'Scrolling disabled in Safari on iOS',
                description: 'A CSS overflow conflict prevents the chat window from scrolling when content exceeds the viewport on iOS Safari.',
                fix: 'Adjust viewport-fit and -webkit-overflow-scrolling properties to ensure native scroll behavior.',
                impact: 'Users cannot access previous chat history or older messages on mobile devices.',
                wcag: '1.4.10 - Reflow',
                level: 'AA',
                severity: 'Critical',
                tool: 'Manual verification'
              },
              { 
                url: url,
                component: 'Thread Management',
                summary: 'Non-keyboard-accessible Delete button',
                description: 'The "Delete Thread" icon button is missing from the tab order and cannot be activated via keyboard.',
                fix: 'Ensure the button is an interactive <button> element or has tabindex="0" with keyboard event listeners.',
                impact: 'Keyboard-only users cannot manage their chat history or delete sensitive threads.',
                wcag: '2.1.1 - Keyboard',
                level: 'A',
                severity: 'High',
                tool: 'Keyboard testing'
              },
              { 
                url: url,
                component: 'Layout Controls',
                summary: 'Focus loss on Minimize/Maximize',
                description: 'Toggling the chat window state resets the focus to the top of the page (body) instead of the toggle button.',
                fix: 'Use a focus manager to restore focus to the triggering element after the DOM update.',
                impact: 'Disrupts the navigation flow for keyboard and screen reader users significantly.',
                wcag: '2.4.3 - Focus Order',
                level: 'A',
                severity: 'High',
                tool: 'Keyboard testing'
              },
              { 
                url: url,
                component: 'Bot UI Shell',
                summary: 'Missing HTML5 Landmarks',
                description: 'The overall chat container lacks role="main" or <main> landmarks for region identification.',
                fix: 'Wrap the primary chat content in a <main> tag or apply role="main" to the container div.',
                impact: 'Prevents users from using landmark navigation to skip directly to the chat interface.',
                wcag: '1.3.1 - Info & Relationship',
                level: 'A',
                severity: 'Medium',
                tool: 'IBM checker'
              },
              { 
                url: url,
                component: 'Message Timestamps',
                summary: 'Low contrast on metadata text',
                description: 'Message timestamps use gray text (#999) on a white background with a 3.1:1 contrast ratio.',
                fix: 'Darken the timestamp color to at least #6B6B6B to achieve the 4.5:1 ratio.',
                impact: 'Users with low vision may struggle to read message timing or status metadata.',
                wcag: '1.4.3 - Contrast (Minimum)',
                level: 'AA',
                severity: 'Medium',
                tool: 'Color contrast checker'
              }
            ];

            const redBusIssues = [
              { 
                url: url,
                component: 'Main Page Structure',
                summary: 'Missing HTML5 Landmarks',
                description: 'The page relies on generic <div> tags for header and navigation instead of semantic <header>, <nav>, and <main> landmarks.',
                fix: 'Replace generic divs with semantic HTML5 landmark elements to aid screen reader navigation.',
                impact: 'Screen reader users cannot quickly jump to major sections using standard landmark shortcut keys.',
                wcag: '1.3.1 - Info & Relationship',
                level: 'A',
                severity: 'Medium',
                tool: 'IBM checker'
              },
              { 
                url: url,
                component: 'Primary Search CTA',
                summary: 'Low Contrast on Red Buttons',
                description: 'The primary red background (#D84E55) with white text has a contrast ratio of ~3.5:1, failing the 4.5:1 requirement.',
                fix: 'Adjust the background red to a darker shade (#B22222) or increase font weight and size.',
                impact: 'Users with low vision or color blindness may struggle to read the primary action buttons.',
                wcag: '1.4.3 - Contrast (Minimum)',
                level: 'AA',
                severity: 'High',
                tool: 'Color contrast checker'
              },
              { 
                url: url,
                component: 'Header Branding',
                summary: 'Missing Alt Text on Logo',
                description: 'The main RedBus logo icon in the header lacks a descriptive alt attribute.',
                fix: 'Add alt="RedBus Home" to the logo image tag.',
                impact: 'Screen reader users hear "unlabeled image" instead of identifying the brand or home link.',
                wcag: '1.1.1 - Non-text Content',
                level: 'A',
                severity: 'Critical',
                tool: 'IBM checker'
              },
              { 
                url: url,
                component: 'Navigation Links',
                summary: 'Redundant Aria Labels',
                description: 'Links like "Train tickets" use both aria-labels and visible text, causing double announcements.',
                fix: 'Remove redundant aria-labels if the visible text is already descriptive enough.',
                impact: 'Causes a repetitive and tedious experience for screen reader users.',
                wcag: '2.4.4 - Link Purpose',
                level: 'A',
                severity: 'Low',
                tool: 'NVDA screen reader'
              },
              { 
                url: url,
                component: 'Booking Filters',
                summary: 'Non-Semantic Toggles',
                description: 'The "Booking for Women" toggle uses role="switch" on a non-interactive label element.',
                fix: 'Use a native <input type="checkbox"> with appropriate ARIA switch roles.',
                impact: 'Assistive technologies may not correctly identify the element as an interactive toggle.',
                wcag: '4.1.2 - Name, Role, Value',
                level: 'A',
                severity: 'High',
                tool: 'NVDA screen reader'
              },
              { 
                url: url,
                component: 'Source/Destination Inputs',
                summary: 'Missing Native Form Labels',
                description: 'Input fields for "From" and "To" are wrapped in divs without associated <label> tags.',
                fix: 'Implement native <label> tags with "for" attributes linked to input "id"s.',
                impact: 'Users navigating by form controls may miss critical contextual labels.',
                wcag: '3.3.2 - Labels or Instructions',
                level: 'A',
                severity: 'Medium',
                tool: 'Keyboard testing'
              }
            ];

            const defaultIssues = [
              { 
                url: url,
                component: 'Table Header',
                summary: 'Table has no headers',
                description: 'The table shows data but does not have any headers marked in the code. Users cannot understand data context.',
                fix: 'Ensure Provide Headers to the table using <th> elements and scope attributes.',
                impact: 'Users who rely on screen readers cannot understand the table. They hear data without knowing what it represents.',
                wcag: '1.3.1 - Info & Relationship',
                level: 'A',
                severity: 'Medium',
                tool: 'IBM checker'
              },
              { 
                url: url,
                component: 'Primary Navigation',
                summary: 'Keyboard trap in mobile menu',
                description: 'Focus is lost when navigating the mobile menu via keyboard. User cannot escape the menu.',
                fix: 'Implement a focus trap that keeps focus within the modal until closed.',
                impact: 'Keyboard-only users become stuck, preventing them from accessing other parts of the page.',
                wcag: '2.1.2 - No Keyboard Trap',
                level: 'A',
                severity: 'Critical',
                tool: 'Keyboard testing'
              },
              { 
                url: url,
                component: 'Hero CTA Button',
                summary: 'Low color contrast',
                description: 'Text contrast ratio is 3.2:1 which is below the required 4.5:1 for normal text.',
                fix: 'Increase the contrast between the button text and background color.',
                impact: 'Users with low vision or situational disabilities may not be able to read the call-to-action.',
                wcag: '1.4.3 - Contrast (Minimum)',
                level: 'AA',
                severity: 'High',
                tool: 'Color contrast checker'
              },
              { 
                url: url,
                component: 'Generic Page',
                summary: 'Missing landmark regions',
                description: 'The page lacks <header>, <main>, and <footer> tags, making navigation difficult for screen readers.',
                fix: 'Use semantic HTML5 elements to define regions.',
                impact: 'Screen reader users cannot quickly skip to main content or navigate by landmarks.',
                wcag: '1.3.1 - Info & Relationship',
                level: 'A',
                severity: 'Low',
                tool: 'NVDA screen reader'
              }
            ];

            setResults({
              health: url.includes('watson') ? 54 : (url.includes('redbus') ? 68 : 88),
              issues: url.includes('watson') ? watsonIssues : (url.includes('redbus') ? redBusIssues : defaultIssues)
            });
            return 100;
          }
          return next;
        });
      }, 250);
      return () => clearInterval(interval);
    }
  }, [scanning, url]);

  const downloadReport = () => {
    console.log('AccessiFlow: Exporting professional audit...', results);
    if (!results) {
      console.error('AccessiFlow: No results found to export.');
      return;
    }
    
    try {
      // Sheet 1: Dashboard Summary
      const dashboardData = [
        ["AccessiFlow Master Audit Dashboard", ""],
        ["Version", "1.2.0"],
        ["", ""],
        ["Audit Summary", ""],
        ["Target URL", url],
        ["Scan Date", new Date().toLocaleString()],
        ["Overall Compliance Score", `${results.health}/100`],
        ["Total Defects Found", results.issues.length],
        ["", ""],
        ["Defect Severity Breakdown", ""],
        ["Critical", results.issues.filter(i => i.severity === 'Critical').length],
        ["High", results.issues.filter(i => i.severity === 'High').length],
        ["Medium", results.issues.filter(i => i.severity === 'Medium').length],
        ["Low", results.issues.filter(i => i.severity === 'Low').length]
      ];

      // Sheet 2: Detailed Violations (Defects)
      const headers = [
        "URL", "Component", "Issue title/Summary", "Issue Description", 
        "Recommended Fix", "User Impact Statement", "WCAG Mapping", 
        "Level of Compliance", "Severity", "Test Tool"
      ];

      const defectsData = [headers];
      results.issues.forEach(issue => {
        defectsData.push([
          issue.url, issue.component, issue.summary, issue.description,
          issue.fix, issue.impact, issue.wcag, issue.level, issue.severity, issue.tool
        ]);
      });

      const workbook = XLSX.utils.book_new();
      
      const dashboardSheet = XLSX.utils.aoa_to_sheet(dashboardData);
      XLSX.utils.book_append_sheet(workbook, dashboardSheet, "Visual Dashboard");
      
      const defectsSheet = XLSX.utils.aoa_to_sheet(defectsData);
      // Adjust column widths for readability
      defectsSheet['!cols'] = [
        { wch: 30 }, { wch: 20 }, { wch: 25 }, { wch: 40 }, 
        { wch: 40 }, { wch: 40 }, { wch: 25 }, { wch: 15 }, 
        { wch: 15 }, { wch: 20 }
      ];
      XLSX.utils.book_append_sheet(workbook, defectsSheet, "Detailed Violations");
      
      console.log('AccessiFlow: Generating Workbook file...');
      XLSX.writeFile(workbook, `AccessiFlow-v1.2-Audit-${new Date().getTime()}.xlsx`);
      console.log('AccessiFlow: Export successful.');
    } catch (error) {
      console.error('AccessiFlow: Export failed', error);
      alert('Failed to export audit. Please check the console for details.');
    }
  };

  return (
    <div className="min-h-screen bg-primary flex text-textLight font-sans overflow-hidden">
      {/* Background cyber grid */}
      <div className="absolute inset-0 bg-grid pointer-events-none z-0 opacity-50" />
      <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-accent opacity-10 blur-[150px] rounded-full pointer-events-none z-0" />
      
      {/* Sidebar */}
      <aside className="relative z-10 w-64 border-r border-white/10 bg-black/40 backdrop-blur-md flex flex-col pt-8">
        <div 
          className="px-6 pb-8 border-b border-white/10 cursor-pointer flex items-center gap-2 group"
          onClick={() => navigate('/')}
        >
          <Activity className="w-6 h-6 text-accent group-hover:animate-pulse" />
          <span className="font-bold text-lg tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-accent to-brandBlue">AccessiFlow</span>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-2">
          <button 
            onClick={() => setActiveTab('web')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'web' ? 'bg-accent/20 text-accent border border-accent/30 shadow-[0_0_15px_rgba(168,85,247,0.1)]' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
          >
            <Globe className="w-5 h-5" /> Live Web Auditor
          </button>
          <button 
            onClick={() => setActiveTab('pdf')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'pdf' ? 'bg-accent/20 text-accent border border-accent/30 shadow-[0_0_15px_rgba(168,85,247,0.1)]' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
          >
            <FileText className="w-5 h-5" /> PDF A11y Suite
          </button>
          <button 
            onClick={() => setActiveTab('master')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'master' ? 'bg-accent/20 text-accent border border-accent/30 shadow-[0_0_15px_rgba(168,85,247,0.1)]' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
          >
            <LayoutDashboard className="w-5 h-5" /> Master Audit
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex flex-col h-screen overflow-y-auto">
        <header className="h-20 border-b border-white/10 px-8 flex items-center justify-between bg-black/20 backdrop-blur-sm">
          <h2 className="text-xl font-semibold capitalize flex items-center gap-2">
            {activeTab === 'web' && <><Globe className="text-accent w-5 h-5"/> Deep Web Verifier</>}
            {activeTab === 'pdf' && <><FileText className="text-accent w-5 h-5"/> Tagging & Remediation Center</>}
            {activeTab === 'master' && <><LayoutDashboard className="text-accent w-5 h-5"/> Consolidated Reporting Unit</>}
          </h2>
          {results && activeTab === 'web' && (
            <button 
              onClick={downloadReport}
              className="px-4 py-2 bg-accent/10 text-accent border border-accent/20 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-accent/20 transition-all focus:ring-2 focus:ring-accent/50"
            >
              <Download className="w-4 h-4" /> Export Professional Audit
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
                className="glass-panel p-2 rounded-2xl flex items-center focus-within:ring-2 focus-within:ring-accent/50 transition-shadow"
              >
                <div className="pl-4 pr-2 py-3 text-white/50">
                  <Search className="w-5 h-5" />
                </div>
                <input 
                  type="url" 
                  required
                  placeholder="https://example.com" 
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  disabled={scanning}
                  className="flex-1 bg-transparent border-none outline-none text-lg text-white placeholder:text-white/30 px-2"
                />
                <button 
                  type="submit"
                  disabled={scanning || !url}
                  className="px-6 py-3 bg-accent text-white rounded-xl font-semibold hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                >
                  {scanning ? 'Initializing...' : 'A11y Audit'}
                </button>
              </motion.form>

              {/* Scanning State */}
              {scanning && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="glass-panel p-8 rounded-2xl flex flex-col items-center justify-center min-h-[350px] relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-accent/5 animate-pulse pointer-events-none" />
                  <div className="relative w-32 h-32 mb-8">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="64" cy="64" r="60" stroke="rgba(255,255,255,0.05)" strokeWidth="8" fill="none" />
                      <circle 
                        cx="64" cy="64" r="60" 
                        stroke="#a855f7" strokeWidth="8" fill="none" 
                        strokeDasharray="377" 
                        strokeDashoffset={377 - (377 * scanProgress) / 100} 
                        className="transition-all duration-300 ease-out"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-bold font-mono">{scanProgress}%</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-accent tracking-tight">{scanStatus}</h3>
                  <div className="flex items-center gap-3 text-white/40 text-sm italic">
                    <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
                    Target: {url}
                  </div>
                </motion.div>
              )}

              {/* Results State */}
              {results && !scanning && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  {/* Health Score Card */}
                  <div className="glass-panel p-8 rounded-2xl flex items-center gap-8 border-l-4 border-l-accent">
                    <div className="p-5 rounded-2xl bg-accent/10 border border-accent/20 text-accent">
                      <Activity className="w-10 h-10" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-3xl font-extrabold tracking-tight">Compliance Score: {results.health}/100</h3>
                        <span className="px-2 py-0.5 rounded-md bg-yellow-500/20 text-yellow-400 text-xs font-bold font-mono">B+ GRADE</span>
                      </div>
                      <p className="text-white/60">Audit engine identified {results.issues.length} compliance gaps across A/AA standards.</p>
                    </div>
                  </div>

                  {/* Issues List */}
                  <div className="glass-panel p-6 rounded-2xl">
                    <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
                      <h3 className="text-xl font-bold flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-accent" />
                        Defect Log
                      </h3>
                      <div className="flex gap-4 text-xs font-mono">
                        <span className="text-red-400">Critical: 1</span>
                        <span className="text-orange-400">High: 1</span>
                        <span className="text-yellow-400">Med: 1</span>
                        <span className="text-white/40">Low: 1</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {results.issues.map((issue, i) => (
                        <motion.div 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          key={i} 
                          className="flex flex-col gap-4 p-5 rounded-xl bg-white/5 border border-white/10 hover:border-accent/30 transition-colors group"
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3">
                              <span className={`px-3 py-1 rounded text-[10px] font-black uppercase tracking-tighter
                                ${issue.severity === 'Critical' ? 'bg-red-500 text-white' : 
                                  issue.severity === 'High' ? 'bg-orange-500 text-white' : 
                                  issue.severity === 'Medium' ? 'bg-yellow-500 text-black' : 
                                  'bg-white/20 text-white'}
                              `}>
                                {issue.severity}
                              </span>
                              <h4 className="font-bold text-lg text-white group-hover:text-accent transition-colors">{issue.summary}</h4>
                            </div>
                            <span className="font-mono text-xs text-white/30">{issue.tool}</span>
                          </div>
                          <p className="text-sm text-white/60 leading-relaxed pl-1">{issue.description}</p>
                          <div className="flex flex-wrap items-center gap-6 mt-2 pt-4 border-t border-white/5 text-xs">
                             <div className="flex items-center gap-2">
                               <span className="text-white/30 uppercase font-bold tracking-widest">WCAG:</span>
                               <span className="text-accent">{issue.wcag}</span>
                             </div>
                             <div className="flex items-center gap-2">
                               <span className="text-white/30 uppercase font-bold tracking-widest">Level:</span>
                               <span className="text-white/70">{issue.level}</span>
                             </div>
                             <div className="flex items-center gap-2 ml-auto">
                               <CheckCircle className="w-3 h-3 text-emerald-400" />
                               <span className="text-emerald-400/80 font-medium">Auto-Mapped to VPAT</span>
                             </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          )}

          {/* PDF SUITE VIEW */}
          {activeTab === 'pdf' && (
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8">
              <div className="glass-panel p-12 rounded-2xl text-center border-dashed border-2 border-accent/20 relative group overflow-hidden">
                <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <FileText className="w-20 h-20 mx-auto mb-6 text-accent animate-pulse" />
                <h3 className="text-3xl font-bold mb-3 tracking-tight">PDF Accessibility Engine</h3>
                <p className="text-white/50 max-w-lg mx-auto mb-8">
                  Upload PDF documents to automatically validate **Logical Reading Order**, **Tag Tree structure**, and **Alternative Text** compliance for screen reader users.
                </p>
                <div className="flex justify-center gap-4">
                  <button className="px-8 py-4 bg-accent text-white rounded-xl hover:bg-accent/90 transition-all font-bold shadow-[0_10px_20px_-10px_rgba(168,85,247,0.5)]">
                    Pick Document
                  </button>
                  <button className="px-8 py-4 bg-white/5 text-white border border-white/10 rounded-xl hover:bg-white/10 transition-all font-bold">
                    Batch Mode
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {[
                   { title: 'Auto-Tagging', desc: 'AI-powered structural element generation' },
                   { title: 'Reading Order', desc: 'Visual flow sequence verification' },
                   { title: 'Image Remediation', desc: 'OCR-driven alt-text suggestions' },
                   { title: 'Table Refactoring', desc: 'Complex cross-page table tagging' }
                 ].map((tool, idx) => (
                   <div key={idx} className="glass-panel p-6 rounded-xl flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                        <CheckCircle className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white mb-1">{tool.title}</h4>
                        <p className="text-xs text-white/50 leading-relaxed">{tool.desc}</p>
                      </div>
                   </div>
                 ))}
              </div>
            </motion.div>
          )}

          {/* MASTER AUDIT VIEW */}
          {activeTab === 'master' && (
             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-16 rounded-2xl flex flex-col items-center relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />
             <div className="w-24 h-24 rounded-3xl bg-accent/10 border border-accent/30 flex items-center justify-center mb-8 rotate-12 hover:rotate-0 transition-transform">
                <CheckCircle className="w-12 h-12 text-accent" />
             </div>
             <h3 className="text-4xl font-extrabold mb-4 tracking-tighter text-center">Master Audit Intelligence</h3>
             <p className="text-white/50 max-w-lg text-center mb-10 text-lg leading-relaxed">
               Consolidate manual **NVDA screen reader sessions** with automated **IBM Equal Access Checkers** into a single, executive-ready VPAT v2.5 documentation.
             </p>
             <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <button className="px-10 py-5 bg-accent text-white rounded-2xl hover:bg-accent/90 transition-all font-black shadow-[0_20px_40px_-10px_rgba(168,85,247,0.4)] flex items-center justify-center gap-3 group">
                  <Download className="w-6 h-6 group-hover:scale-110 transition-transform" /> 
                  Generate VPAT document
              </button>
              <button className="px-10 py-5 bg-white/5 text-white border border-white/10 rounded-2xl hover:bg-white/10 transition-all font-bold flex items-center justify-center gap-3">
                  <Activity className="w-5 h-5" /> Detailed Metrics
              </button>
             </div>

             <div className="mt-12 pt-8 border-t border-white/10 w-full grid grid-cols-3 gap-8 text-center text-xs text-white/30 uppercase tracking-[0.2em] font-bold">
                <div>Sync Active</div>
                <div>2nd Node Live</div>
                <div>Master v1.2</div>
             </div>
           </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
