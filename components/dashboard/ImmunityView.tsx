"use client";
import { useHealthStore } from "@/store/health-store";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";

const immunityData = [
  { cell: "CD4+ T", value: 42 },
  { cell: "CD8+ T", value: 28 },
  { cell: "B Cells", value: 12 },
  { cell: "NK Cells", value: 18 },
  { cell: "Monocytes", value: 8 },
  { cell: "Dendritic", value: 6 },
];

export default function ImmunityView() {
  const { report } = useHealthStore();
  const { immunity } = report;

  return (
    <div className="p-6 space-y-6 animate-fade-up">
      <div>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, color: "var(--color-text-primary)", marginBottom: 4 }}>
          Immune System Profile
        </h2>
        <p style={{ fontSize: 13, color: "var(--color-text-muted)" }}>
          Comprehensive immune cell distribution and functional markers
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 14, color: "var(--color-text-primary)", marginBottom: 16 }}>
            Immune Cell Distribution
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={immunityData}>
              <PolarGrid stroke="var(--color-border)" />
              <PolarAngleAxis dataKey="cell" tick={{ fill: "var(--color-text-muted)", fontSize: 11 }} />
              <Radar dataKey="value" name="Your values"
                fill="color-mix(in oklch, #4f8ef7 20%, transparent)" stroke="#4f8ef7" strokeWidth={2}
                dot={{ fill: "#4f8ef7", r: 3 }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 14, color: "var(--color-text-primary)", marginBottom: 16 }}>
            Cell Count Analysis
          </h3>
          <div className="space-y-4">
            {[
              { label: "T Cells (Total)", value: immunity.yourTCells, min: 60, max: 80, color: "#4f8ef7" },
              { label: "CD4+ Helper T", value: 42, min: immunity.cd4HelperT.min, max: immunity.cd4HelperT.max, color: "#38d9c0" },
              { label: "CD8+ Cytotoxic T", value: 28, min: immunity.cd8CytotoxicT.min, max: immunity.cd8CytotoxicT.max, color: "#a855f7" },
              { label: "B Cells", value: 12, min: immunity.bCells.min, max: immunity.bCells.max, color: "#f59e0b" },
              { label: "Monocytes", value: 8, min: immunity.monocytes.min, max: immunity.monocytes.max, color: "#f97316" },
            ].map((cell) => {
              const inRange = cell.value >= cell.min && cell.value <= cell.max;
              return (
                <div key={cell.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>{cell.label}</span>
                    <div className="flex items-center gap-2">
                      <span style={{ fontSize: 10, color: "var(--color-text-muted)" }}>Normal: {cell.min}–{cell.max}%</span>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 700, color: inRange ? "#22c55e" : "#ef4444" }}>
                        {cell.value}%
                      </span>
                    </div>
                  </div>
                  <div style={{ height: 6, background: "var(--color-border)", borderRadius: 3, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${cell.value}%`, background: inRange ? cell.color : "#ef4444", borderRadius: 3, transition: "width 1s ease-out" }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="card md:col-span-2">
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 14, color: "var(--color-text-primary)", marginBottom: 16 }}>
            Functional Ratios
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "CD4/CD8 Ratio", value: immunity.cd4cd8Ratio.value, optimal: "1.5–2.5", status: immunity.cd4cd8Ratio.status, color: "#4f8ef7" },
              { label: "Lymphocyte/Mono", value: immunity.lymphocyteMonocyte.value, optimal: "3.0–4.5", status: immunity.lymphocyteMonocyte.status, color: "#38d9c0" },
              { label: "T/B Cell Ratio", value: 5.7, optimal: "4.0–8.0", status: "Normal", color: "#22c55e" },
              { label: "NK Cell Activity", value: 0.82, optimal: "0.7–1.0", status: "Normal", color: "#a855f7" },
            ].map((r) => {
              const sc: Record<string, string> = { Normal: "#22c55e", Suboptimal: "#f59e0b", Optimal: "#22c55e" };
              const c = sc[r.status] ?? "#f59e0b";
              return (
                <div key={r.label} className="rounded-xl p-4 text-center"
                  style={{ background: "var(--color-surface-3)", border: "1px solid var(--color-border)" }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontWeight: 800, fontSize: 24, color: r.color, marginBottom: 4 }}>{r.value}</div>
                  <div style={{ fontSize: 11, color: "var(--color-text-secondary)", marginBottom: 6 }}>{r.label}</div>
                  <div style={{ fontSize: 10, color: "var(--color-text-muted)", marginBottom: 6 }}>Optimal: {r.optimal}</div>
                  <span className="px-2 py-0.5 rounded text-xs font-semibold"
                    style={{ background: `color-mix(in oklch, ${c} 12%, transparent)`, color: c }}>{r.status}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
