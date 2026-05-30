"use client";
import { ChevronLeft } from "lucide-react";
import { motion } from "motion/react";
import { useHealthStore } from "@/store/health-store";
import RadarChart from "@/components/charts/RadarChart";

export default function AgeReportPanel() {
  const { report } = useHealthStore();
  const diff = report.biologicalAge - report.chronologicalAge;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
      className="card flex flex-col" style={{ minWidth: 220, maxWidth: 260 }}>

      <div className="flex items-center gap-2 mb-4">
        <button className="flex items-center gap-1 text-xs transition-opacity hover:opacity-70"
          style={{ color: "var(--color-text-muted)" }}>
          <ChevronLeft size={11} />
          <span>Age Report</span>
        </button>
        <span className="px-2 py-0.5 rounded-md text-xs font-semibold"
          style={{ background: "color-mix(in oklch, #ef4444 15%, transparent)", color: "#ef4444", border: "1px solid color-mix(in oklch, #ef4444 30%, transparent)" }}>
          Suboptimal
        </span>
      </div>

      <div className="mb-4">
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, color: "var(--color-text-primary)", marginBottom: 4 }}>
          Biological Age
        </h2>
        <p style={{ fontSize: 11, color: "var(--color-text-muted)", lineHeight: 1.5 }}>
          Measures how your body&apos;s aging, reveals your biological age
        </p>
      </div>

      <div className="flex justify-center mb-4">
        <RadarChart dimensions={report.radarDimensions} size={186} />
      </div>

      <div className="rounded-xl p-3 mt-auto"
        style={{ background: "color-mix(in oklch, #ef4444 8%, transparent)", border: "1px solid color-mix(in oklch, #ef4444 20%, transparent)" }}>
        <div className="flex items-center justify-between">
          <div>
            <div style={{ fontSize: 10, color: "var(--color-text-muted)", marginBottom: 2 }}>Age gap</div>
            <div style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 20, color: "#ef4444" }}>
              +{diff} <span style={{ fontSize: 11 }}>yrs</span>
            </div>
          </div>
          <div className="text-right">
            <div style={{ fontSize: 10, color: "var(--color-text-muted)", marginBottom: 2 }}>Status</div>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#f97316" }}>Accelerated</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
