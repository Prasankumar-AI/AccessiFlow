import React from 'react';
import { motion } from 'framer-motion';
import { Check, Info } from 'lucide-react';

const tools = [
  {
    category: "Screen Readers",
    tool: "NVDA & JAWS Simulation",
    function: "Virtual cursor auditing for screen reader fidelity",
    badge: "Integrated"
  },
  {
    category: "Automation",
    tool: "IBM Equal Access Engine",
    function: "Enterprise rule sets with 10-column defect mapping",
    badge: "Built-in"
  },
  {
    category: "Design Analysis",
    tool: "Color Contrast (WCAG 2.2)",
    function: "Automated luminance and contrast verification",
    badge: "Advanced"
  },
  {
    category: "UX/UI Auditing",
    tool: "Keyboard Logic Mapping",
    function: "Trap detection, skip-links, and focus pathing",
    badge: "Assisted"
  }
];

export default function ToolingTable() {
  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-24 relative z-20">
      
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">The v1.2 Engine</h2>
        <p className="text-white/60 text-lg italic">Enterprise-grade tooling, unified in one cinematic console.</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glass-panel rounded-2xl overflow-hidden border border-white/5 shadow-2xl backdrop-blur-xl"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/[0.03] border-b border-white/10 text-[10px] font-black text-white/40 tracking-[0.2em]">
                <th className="p-6 uppercase">Testing Module</th>
                <th className="p-6 uppercase">Infrastructure</th>
                <th className="p-6 uppercase">Core Capability</th>
                <th className="p-6 text-right uppercase">Deployment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {tools.map((row, idx) => (
                <tr key={idx} className="hover:bg-accent/[0.03] transition-all group">
                  <td className="p-6 font-bold text-white group-hover:text-accent transition-colors whitespace-nowrap">
                    {row.tool}
                  </td>
                  <td className="p-6 text-white/50 text-sm italic font-mono whitespace-nowrap">
                    {row.category}
                  </td>
                  <td className="p-6 text-white/70 text-sm leading-relaxed min-w-[280px]">
                    {row.function}
                  </td>
                  <td className="p-6 text-right">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded bg-accent/10 text-accent border border-accent/20 text-[10px] font-black uppercase tracking-widest">
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
