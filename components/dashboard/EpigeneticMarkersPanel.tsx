"use client";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useHealthStore } from "@/store/health-store";

export default function EpigeneticMarkersPanel() {
  const { report } = useHealthStore();
  const [expanded, setExpanded] = useState<number>(0);
  const [hovItem, setHovItem] = useState<string | null>(null);

  const riskColors = { low: "#22c55e", moderate: "#f59e0b", high: "#ef4444" } as const;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
      className="card">
      <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 14, color: "var(--color-text-primary)", marginBottom: 12 }}>
        Epigenetic markers
      </h3>

      <div className="space-y-3">
        {report.epigeneticGroups.map((group, gi) => (
          <div key={gi}>
            <button
              onClick={() => setExpanded(expanded === gi ? -1 : gi)}
              className="w-full flex items-center gap-2 py-1.5 transition-opacity hover:opacity-80">
              <div className="w-2 h-2 rounded-full" style={{ background: group.color }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: "var(--color-text-primary)", flex: 1, textAlign: "left" }}>
                {group.name}
              </span>
              <ChevronRight size={12} style={{
                color: "var(--color-text-muted)",
                transform: expanded === gi ? "rotate(90deg)" : "none",
                transition: "transform 0.2s",
              }} />
            </button>

            <AnimatePresence>
              {expanded === gi && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="overflow-hidden ml-4 space-y-1 mt-1">
                  {group.items.map((item, ii) => {
                    const key = `${gi}-${ii}`;
                    const rc = riskColors[item.risk];
                    return (
                      <div key={ii}
                        className="flex items-center gap-3 py-1.5 px-3 rounded-lg cursor-default transition-all duration-150"
                        style={{
                          background: hovItem === key ? "var(--color-surface-3)" : "transparent",
                          border: `1px solid ${hovItem === key ? "var(--color-border)" : "transparent"}`,
                        }}
                        onMouseEnter={() => setHovItem(key)}
                        onMouseLeave={() => setHovItem(null)}>
                        <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: rc }} />
                        <div className="flex-1">
                          <div style={{ fontSize: 11, fontWeight: 600, color: "var(--color-text-secondary)" }}>{item.label}</div>
                          <div style={{ fontSize: 10, color: "var(--color-text-muted)" }}>{item.sub}</div>
                        </div>
                        <span style={{ fontSize: 9, fontWeight: 600, color: rc, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                          {item.risk}
                        </span>
                      </div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
