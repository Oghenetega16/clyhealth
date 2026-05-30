"use client";
import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { useHealthStore } from "@/store/health-store";

export default function MethylationPanel() {
  const { report, setActiveTab } = useHealthStore();
  const { methylation } = report;
  const sc: Record<string, string> = { Low: "#22c55e", Moderate: "#f59e0b", High: "#ef4444" };
  const color = sc[methylation.status] ?? "#f59e0b";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
      className="card">
      <div className="flex items-center justify-between mb-3">
        <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 13, color: "var(--color-text-primary)" }}>
          Methylation risk score
        </h3>
        <button onClick={() => setActiveTab("methylation")}
          className="flex items-center gap-1 text-xs transition-opacity hover:opacity-75"
          style={{ color: "var(--color-accent-blue)" }}>
          View report <ChevronRight size={11} />
        </button>
      </div>

      <p style={{ fontSize: 11, color: "var(--color-text-muted)", lineHeight: 1.5, marginBottom: 16 }}>
        A methylation score of{" "}
        <span style={{ color: "var(--color-text-secondary)", fontWeight: 600 }}>{methylation.score}</span>
        {" "}equals a biological age of{" "}
        <span style={{ color: "var(--color-text-secondary)", fontWeight: 600 }}>{methylation.biologicalAge}</span>
        , indicating accelerated aging.
      </p>

      <div className="flex items-baseline gap-3 mb-4">
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 34, color, lineHeight: 1 }}>
          {methylation.score}
        </span>
        <div>
          <div style={{ fontSize: 10, color: "var(--color-text-muted)" }}>
            Equal to <span style={{ color: "var(--color-text-secondary)", fontWeight: 600 }}>{methylation.biologicalAge}</span>
          </div>
          <div style={{ fontSize: 10, color: "var(--color-text-muted)" }}>
            <span style={{ color: "var(--color-accent-cyan)", fontWeight: 600 }}>{methylation.chronologicalAge}</span> Chronological
          </div>
        </div>
      </div>

      {/* Scale bar */}
      <div className="relative mb-3">
        <div className="h-2 rounded-full overflow-hidden"
          style={{ background: "linear-gradient(to right, #22c55e, #f59e0b, #ef4444)" }} />
        <motion.div
          className="absolute -top-1 w-4 h-4 rounded-full border-2"
          initial={{ left: "0%" }}
          animate={{ left: `calc(${methylation.score * 100}% - 8px)` }}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
          style={{ background: color, borderColor: "var(--color-surface-2)", boxShadow: `0 0 8px ${color}80` }}
        />
      </div>

      <div className="flex justify-between mb-3">
        {["Low", "Medium", "High"].map((l) => (
          <span key={l} style={{ fontSize: 9, color: methylation.status === l ? color : "var(--color-text-muted)", fontWeight: methylation.status === l ? 700 : 400 }}>
            {l}
          </span>
        ))}
      </div>

      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
        style={{ background: `color-mix(in oklch, ${color} 12%, transparent)`, border: `1px solid color-mix(in oklch, ${color} 28%, transparent)` }}>
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
        <span style={{ fontSize: 11, color, fontWeight: 600 }}>{methylation.status}</span>
      </div>
    </motion.div>
  );
}
