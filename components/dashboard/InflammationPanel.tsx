"use client";
import { Plus, Info } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";
import { useHealthStore } from "@/store/health-store";
import { getStatusColor } from "@/lib/utils";
import InflammationChart from "@/components/charts/InflammationChart";

export default function InflammationPanel() {
  const { report } = useHealthStore();
  const { inflammation } = report;
  const [expanded, setExpanded] = useState<number | null>(null);
  const sc = getStatusColor(inflammation.status);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
      className="card">
      <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 14, color: "var(--color-text-primary)", marginBottom: 12 }}>
        Inflammation
      </h3>

      <div className="mb-3">
        <div className="flex items-center gap-2 mb-1.5">
          <span style={{ fontSize: 12, color: "var(--color-text-secondary)", fontWeight: 500 }}>
            DNAm CRP (DNA Methylation C-Reactive Protein)
          </span>
          <div className="w-4 h-4 rounded-full flex items-center justify-center cursor-pointer"
            style={{ background: "var(--color-surface-3)" }}>
            <Info size={9} style={{ color: "var(--color-text-muted)" }} />
          </div>
        </div>

        <div className="flex items-center gap-3 mb-2">
          <span style={{ fontSize: 10, color: "var(--color-text-muted)" }}>Percentile</span>
          <div className="flex-1 relative h-2 rounded-full overflow-hidden"
            style={{ background: "linear-gradient(to right, #22c55e, #f59e0b, #ef4444)" }}>
            <div className="absolute -translate-y-0.5 w-2.5 h-2.5 rounded-full border-2"
              style={{ left: `calc(${inflammation.percentile}% - 5px)`, background: "#fff", borderColor: sc, boxShadow: `0 0 6px ${sc}` }} />
          </div>
        </div>

        <div className="flex items-baseline gap-2">
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 28, color: sc }}>
            {inflammation.dnamCRP}
          </span>
          <span style={{ fontSize: 12, color: "var(--color-text-muted)" }}>mg/L</span>
          <span className="ml-auto px-2.5 py-1 rounded-lg text-xs font-semibold"
            style={{ background: `color-mix(in oklch, ${sc} 12%, transparent)`, color: sc, border: `1px solid color-mix(in oklch, ${sc} 28%, transparent)` }}>
            {inflammation.percentile}th
          </span>
        </div>
      </div>

      <div className="mb-3">
        <div className="flex items-center justify-between mb-2">
          <span style={{ fontSize: 10, color: "var(--color-text-muted)" }}>Change Over Time</span>
          <span className="px-2 py-0.5 rounded text-xs font-semibold"
            style={{ background: "color-mix(in oklch, #ef4444 10%, transparent)", color: "#ef4444" }}>
            +14.2% ↑
          </span>
        </div>
        <InflammationChart />
      </div>

      <div className="rounded-xl p-3 mb-3"
        style={{ background: "color-mix(in oklch, #ef4444 6%, transparent)", border: "1px solid color-mix(in oklch, #ef4444 18%, transparent)" }}>
        <p style={{ fontSize: 11, color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
          This score is higher than{" "}
          <span style={{ fontWeight: 700, color: sc }}>{inflammation.percentile}%</span>
          {" "}of the reference population, indicating{" "}
          <span style={{ fontWeight: 700, color: sc }}>above-average</span>
          {" "}chronic inflammation
        </p>
      </div>

      <div className="space-y-1.5">
        {inflammation.risks.map((risk, i) => (
          <button key={i} onClick={() => setExpanded(expanded === i ? null : i)}
            className="w-full text-left flex items-start gap-2 py-2 px-3 rounded-lg transition-all duration-200"
            style={{
              background: expanded === i ? "color-mix(in oklch, #ef4444 7%, transparent)" : "transparent",
              border: `1px solid ${expanded === i ? "color-mix(in oklch, #ef4444 18%, transparent)" : "transparent"}`,
            }}>
            <span style={{ fontSize: 12, color: "#ef4444", marginTop: 1, flexShrink: 0 }}>•</span>
            <span style={{ fontSize: 11, color: "var(--color-text-secondary)", lineHeight: 1.5 }}>{risk}</span>
          </button>
        ))}
      </div>

      <button className="mt-4 w-8 h-8 rounded-full flex items-center justify-center ml-auto transition-all hover:scale-110"
        style={{ background: "linear-gradient(135deg, var(--color-accent-blue), var(--color-accent-cyan))", boxShadow: "0 4px 12px color-mix(in oklch, var(--color-accent-blue) 40%, transparent)" }}>
        <Plus size={14} className="text-white" />
      </button>
    </motion.div>
  );
}
