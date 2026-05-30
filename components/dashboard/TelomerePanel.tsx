"use client";
import { ChevronRight, Info } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";
import { useHealthStore } from "@/store/health-store";
import TelomereChart from "@/components/charts/TelomereChart";

export default function TelomerePanel() {
  const { report, setActiveTab } = useHealthStore();
  const { telomere } = report;
  const [showInfo, setShowInfo] = useState(false);
  const gc = telomere.grade === "Long" ? "#22c55e" : telomere.grade === "Medium" ? "#f59e0b" : "#ef4444";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
      className="card" style={{ minWidth: 240 }}>
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 22, color: "var(--color-text-primary)" }}>
            {telomere.length}
          </span>
          <span style={{ fontSize: 11, color: "var(--color-text-muted)", alignSelf: "flex-end", marginBottom: 2 }}>{telomere.unit}</span>
          <span className="px-2 py-0.5 rounded-full text-xs font-semibold ml-1"
            style={{ background: `color-mix(in oklch, ${gc} 12%, transparent)`, color: gc, border: `1px solid color-mix(in oklch, ${gc} 30%, transparent)` }}>
            {telomere.grade}
          </span>
        </div>
        <button
          onClick={() => setShowInfo(!showInfo)}
          className="w-6 h-6 rounded-full flex items-center justify-center transition-colors"
          style={{ color: "var(--color-text-muted)", background: showInfo ? "var(--color-surface-3)" : "transparent" }}>
          <Info size={12} />
        </button>
      </div>

      <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 13, color: "var(--color-text-primary)", marginBottom: 4 }}>
        Telomere length
      </h3>

      {showInfo ? (
        <div className="rounded-lg p-3 mb-3 animate-fade-in"
          style={{ background: "var(--color-surface-3)", border: "1px solid var(--color-border)" }}>
          <p style={{ fontSize: 11, color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
            Telomeres are protective caps on chromosomes. Shorter telomeres indicate accelerated cellular aging. Your {telomere.length} Kb length is typical of a {telomere.typicalAge}-year-old.
          </p>
        </div>
      ) : (
        <p style={{ fontSize: 11, color: "var(--color-text-muted)", marginBottom: 8, lineHeight: 1.5 }}>
          Your telomere length matches that of a typical {telomere.typicalAge}-year-old
        </p>
      )}

      <TelomereChart data={telomere} compact />

      <div className="flex justify-between mt-1">
        {[10, 20, 30, 40, 50, 60].map((a) => (
          <span key={a} style={{ fontSize: 8, color: "var(--color-text-muted)" }}>{a}</span>
        ))}
      </div>
      <div className="text-center" style={{ fontSize: 9, color: "var(--color-text-muted)", marginTop: 2 }}>
        Age (years)
      </div>

      <button onClick={() => setActiveTab("telomere")}
        className="flex items-center gap-1 mt-3 text-xs font-medium transition-opacity hover:opacity-75"
        style={{ color: "var(--color-accent-blue)" }}>
        View full report <ChevronRight size={11} />
      </button>
    </motion.div>
  );
}
