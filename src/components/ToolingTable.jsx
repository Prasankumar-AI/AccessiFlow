import React from 'react';
import { motion } from 'framer-motion';
import { Check, Info } from 'lucide-react';

const tools = [
  {
    category: "Screen Readers",
    tool: "NVDA & TalkBack",
    function: "Screen reader auditing on real devices",
    badge: "Integrated"
  },
  {
    category: "Automation",
    tool: "IBM Equal Access Checker",
    function: "Enterprise-grade automated rule sets",
    badge: "Built-in"
  },
  {
    category: "Design Testing",
    tool: "CCA (Color Contrast)",
    function: "Verify WCAG contrast across gradients",
    badge: "Advanced"
  },
  {
    category: "UX Testing",
    tool: "Keyboard Focus Mapping",
    function: "Plot focus paths, detect traps & skip-links",
    badge: "Assisted"
  }
];

export default function ToolingTable() {
  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-24 relative z-20">
      
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">The Technical Tooling</h2>
        <p className="text-white/60 text-lg">Deep integration with industry-standard accessibility tools.</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glass-panel rounded-2xl overflow-hidden border border-white/10"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/10 text-sm font-semibold text-white/50 tracking-wider">
                <th className="p-6 uppercase">Integration</th>
                <th className="p-6 uppercase">Testing Type</th>
                <th className="p-6 uppercase">Core Function</th>
                <th className="p-6 text-right uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {tools.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="p-6 font-medium text-white group-hover:text-brandBlue transition-colors whitespace-nowrap">
                    {row.tool}
                  </td>
                  <td className="p-6 text-white/70 whitespace-nowrap">
                    {row.category}
                  </td>
                  <td className="p-6 text-white/70 min-w-[280px]">
                    {row.function}
                  </td>
                  <td className="p-6 text-right">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brandBlue/10 text-brandBlue border border-brandBlue/20">
                      <Check className="w-3 h-3" />
                      {row.badge}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
      
    </section>
  );
}
