import React from 'react';
import { motion } from 'framer-motion';
import { Globe, FileText, MonitorDot, BarChart3 } from 'lucide-react';

const features = [
  {
    icon: <Globe className="w-8 h-8 text-accent" />,
    title: "Deep Web Auditor",
    subtitle: "(Powered by IBM & AI)",
    items: [
      "Automated Workflow Scanning: Identify 40% of issues instantly using our v1.2 audit engine.",
      "SDK Integration: Shift left by integrating checks directly into your CI/CD pipeline.",
      "Dynamic Issue Grouping: Our AI groups unique issues by WCAG 2.2 guideline and component type."
    ]
  },
  {
    icon: <FileText className="w-8 h-8 text-accent" />,
    title: "PDF A11y Suite",
    subtitle: "(v1.2 Upgrade)",
    items: [
      "Tag Structure Validation: Ensure PDFs are readable by screen readers via structural mapping.",
      "Compliance Reports: Generate detailed sheets to meet Section 508 and ADA requirements.",
      "Reading Order Analysis: Verify and fix the logical reading flow with visual decorators."
    ]
  },
  {
    icon: <MonitorDot className="w-8 h-8 text-accent" />,
    title: "Manual Verification",
    subtitle: "(Real Tools)",
    items: [
      "Integrated Screen Readers: Simulate virtual cursors for NVDA and VoiceOver testing.",
      "IBM Equal Access: Run enterprise-grade automated checks within our cinematic console.",
      "Guided Keyboard Audits: Map focus paths, trap detection, and interactive role verification."
    ]
  },
  {
    icon: <BarChart3 className="w-8 h-8 text-accent" />,
    title: "Master Audit System",
    subtitle: "(Professional Reporting)",
    items: [
      "2-Sheet Excel Format: Export Visual Dashboards and Detailed Defect Logs for IBM standards.",
      "Consolidated Data: Automated Scans, NVDA Sessions, Keyboard Logs, and Contrast analysis.",
      "VPAT 2.5 Readiness: Pre-mapped to WCAG 2.2 for enterprise-ready accessibility reports."
    ]
  }
];

export default function FeatureGrid() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-24 relative z-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">The Suite 1.2 Toolkit</h2>
        <p className="text-white/60 text-lg">Cinematic performance. Enterprise accuracy.</p>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {features.map((feature, idx) => (
          <motion.div 
            key={idx}
            variants={item}
            className="group relative glass-panel rounded-2xl p-8 hover:bg-white/5 transition-colors overflow-hidden border-white/5 hover:border-accent/20"
          >
            {/* Hover Glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-br from-accent to-transparent pointer-events-none" />
            
            <div className="mb-6 inline-block p-4 rounded-xl bg-accent/5 border border-accent/20 shadow-lg">
              {feature.icon}
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-1 flex flex-col xl:flex-row xl:items-baseline gap-2">
              {feature.title} 
              <span className="text-sm font-normal text-accent/80 font-mono">{feature.subtitle}</span>
            </h3>
            
            <ul className="mt-6 space-y-4">
              {feature.items.map((line, i) => {
                const [boldPart, ...rest] = line.split(':');
                return (
                  <li key={i} className="flex items-start gap-3 text-white/70">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                    <span>
                      {rest.length > 0 ? (
                        <>
                          <strong className="text-white/90 font-medium">{boldPart}:</strong>
                          {rest.join(':')}
                        </>
                      ) : (
                        line
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
