"use client";
import { useState } from "react";
import { motion } from "motion/react";
import { useHealthStore } from "@/store/health-store";
import { getStatusColor } from "@/lib/utils";

function RangeBar({ min, max, label, normal, color = "#4f8ef7" }: {
  min: number; max: number; label: string; normal: [number, number]; color?: string;
}) {
  const [hov, setHov] = useState(false);
  const total = max - min;
  const nStart = ((normal[0] - min) / total) * 100;
  const nWidth = ((normal[1] - normal[0]) / total) * 100;
  return (
    <div className="flex items-center gap-3 py-1 cursor-default"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <span style={{ fontSize: 11, color: hov ? "var(--color-text-primary)" : "var(--color-text-secondary)", minWidth: 148, transition: "color 0.15s" }}>
        {label}
      </span>
      <div className="flex-1 relative" style={{ height: 5 }}>
        <div className="absolute inset-0 rounded-full" style={{ background: "var(--color-border)" }} />
        <div className="absolute h-full rounded-full transition-opacity"
          style={{ left: `${nStart}%`, width: `${nWidth}%`, background: color, opacity: hov ? 0.85 : 0.5 }} />
      </div>
      <span style={{ fontSize: 10, color: "var(--color-text-muted)", minWidth: 58, textAlign: "right", fontFamily: "var(--font-mono)" }}>
        {normal[0]}–{normal[1]}%
      </span>
    </div>
  );
}

export default function ImmunityPanel() {
  const { report } = useHealthStore();
  const { immunity } = report;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
      className="card">
      <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 14, color: "var(--color-text-primary)", marginBottom: 4 }}>
        Immunity
      </h3>

      <div className="rounded-xl p-3 mb-4"
        style={{ background: "var(--color-surface-3)", border: "1px solid var(--color-border)" }}>
        <div style={{ fontSize: 10, color: "var(--color-text-muted)", marginBottom: 4 }}>Your T%</div>
        <div className="flex items-baseline gap-2">
          <span style={{ fontSize: 11, color: "var(--color-text-secondary)" }}>T Cells (Total)</span>
          <div className="flex-1" />
          <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 18, color: "var(--color-accent-blue)" }}>
            {immunity.yourTCells}
          </span>
          <span style={{ fontSize: 11, color: "var(--color-text-muted)" }}>%</span>
        </div>
        <div className="mt-1.5" style={{ fontSize: 10, color: "var(--color-text-muted)" }}>
          Normal: <span style={{ color: "var(--color-accent-cyan)" }}>{immunity.tCellsTotal.min}–{immunity.tCellsTotal.max}%</span>
        </div>
      </div>

      <div className="rounded-lg px-3 py-2 inline-flex items-baseline gap-1 mb-4"
        style={{ background: "color-mix(in oklch, var(--color-accent-blue) 12%, transparent)", border: "1px solid color-mix(in oklch, var(--color-accent-blue) 28%, transparent)" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 20, color: "var(--color-accent-blue)" }}>60-80</span>
        <span style={{ fontSize: 11, color: "var(--color-text-muted)" }}>%</span>
      </div>

      <div className="space-y-1 mb-4">
        <RangeBar label="CD4+ T Cells (Helper T Cells)" min={0} max={100} normal={[immunity.cd4HelperT.min, immunity.cd4HelperT.max]} color="#4f8ef7" />
        <RangeBar label="CD8+ T Cells (Cytotoxic T)" min={0} max={100} normal={[immunity.cd8CytotoxicT.min, immunity.cd8CytotoxicT.max]} color="#a855f7" />
        <RangeBar label="B Cells" min={0} max={100} normal={[immunity.bCells.min, immunity.bCells.max]} color="#38d9c0" />
        <RangeBar label="Monocytes" min={0} max={100} normal={[immunity.monocytes.min, immunity.monocytes.max]} color="#f59e0b" />
      </div>

      <div className="space-y-2">
        {[
          { label: "CD4T/CD8T Cell Ratio", value: immunity.cd4cd8Ratio.value, status: immunity.cd4cd8Ratio.status, dot: "#4f8ef7" },
          { label: "Lymphocyte/ Monocyte", value: immunity.lymphocyteMonocyte.value, status: immunity.lymphocyteMonocyte.status, dot: "#38d9c0" },
        ].map((row) => {
          const sc = getStatusColor(row.status);
          return (
            <div key={row.label}
              className="flex items-center gap-3 py-1.5 px-3 rounded-lg transition-colors hover:bg-[var(--color-surface-3)] cursor-default"
              style={{ border: "1px solid var(--color-border)" }}>
              <div className="w-2 h-2 rounded-full shrink-0" style={{ background: row.dot }} />
              <span style={{ fontSize: 11, color: "var(--color-text-secondary)", flex: 1 }}>{row.label}</span>
              <span className="px-2 py-0.5 rounded text-xs font-semibold"
                style={{ background: `color-mix(in oklch, ${sc} 12%, transparent)`, color: sc }}>
                {row.status}
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 700, color: "var(--color-text-primary)", minWidth: 24, textAlign: "right" }}>
                {row.value}
              </span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
