import React from 'react';
import { motion } from 'framer-motion';
import { Globe, FileText, MonitorDot, BarChart3 } from 'lucide-react';

const features = [
  {
    icon: <Globe className="w-8 h-8 text-brandBlue" />,
    title: "Core Web Accessibility",
    subtitle: "(Powered by Spectra™ & AI)",
    items: [
      "Automated Workflow Scanning: Identify 40% of issues instantly using our 5x faster scanner.",
      "SDK Integration: Shift left by integrating checks directly into your CI/CD pipeline.",
      "Dynamic Issue Grouping: Our AI groups unique issues by WCAG guideline and component type."
    ]
  },
  {
    icon: <FileText className="w-8 h-8 text-accent" />,
    title: "Comprehensive PDF Suite",
    subtitle: "(New Capability)",
    items: [
      "Tag Structure Validation: Ensure PDFs are readable by screen readers.",
      "Compliance Reports: Generate reports to meet Section 508 and ADA requirements.",
      "Reading Order Analysis: Verify and fix the logical reading flow."
    ]
  },
  {
    icon: <MonitorDot className="w-8 h-8 text-purple-400" />,
    title: "Manual Testing Hub",
    subtitle: "(Real Devices & Tools)",
    items: [
      "Integrated Screen Readers: Instant access to NVDA, VoiceOver, and TalkBack.",
      "IBM Equal Access: Run enterprise-grade automated checks within the platform.",
      "Guided Keyboard Audits: Map focus paths, trap detection, and skip-link functionality."
    ]
  },
  {
    icon: <BarChart3 className="w-8 h-8 text-emerald-400" />,
    title: "The Reporting System",
    subtitle: "(Master Audit)",
    items: [
      "Downloadable Excel Format: Export consolidated audit sheets for executives.",
      "Consolidated Data: Automated Scans, Screen Readers, Manual Logs, CCA.",
      "VPAT Readiness: Pre-mapped to WCAG guidelines for Voluntary Product Accessibility Templates."
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
        <h2 className="text-3xl md:text-5xl font-bold mb-4">The Core 4 Toolkit</h2>
        <p className="text-white/60 text-lg">Everything you need, unified in one platform.</p>
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
            className="group relative glass-panel rounded-2xl p-8 hover:bg-white/5 transition-colors overflow-hidden"
          >
            {/* Hover Glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
            
            <div className="mb-6 inline-block p-4 rounded-xl bg-white/5 border border-white/10 shadow-lg">
              {feature.icon}
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-1 flex flex-col xl:flex-row xl:items-baseline gap-2">
              {feature.title} 
              <span className="text-sm font-normal text-brandBlue">{feature.subtitle}</span>
            </h3>
            
            <ul className="mt-6 space-y-4">
              {feature.items.map((line, i) => {
                const [boldPart, ...rest] = line.split(':');
                return (
                  <li key={i} className="flex items-start gap-3 text-white/70">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brandBlue shrink-0" />
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
