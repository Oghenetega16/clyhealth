"use client";
import { useHealthStore } from "@/store/health-store";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "motion/react";

const methylationSites = [
  { gene: "ELOVL2", methylation: 82, expected: 65, label: "Aging clock" },
  { gene: "FHL2", methylation: 71, expected: 60, label: "Heart/muscle" },
  { gene: "PENK", methylation: 58, expected: 55, label: "Neuropeptide" },
  { gene: "MYOD1", methylation: 45, expected: 50, label: "Muscle diff." },
  { gene: "KLF14", methylation: 38, expected: 42, label: "Metabolic" },
  { gene: "TRIM59", methylation: 29, expected: 30, label: "Immunity" },
];

const clockData = [
  { clock: "Horvath", bioAge: 46.2, chronoAge: 42 },
  { clock: "Hannum", bioAge: 47.1, chronoAge: 42 },
  { clock: "PhenoAge", bioAge: 48.4, chronoAge: 42 },
  { clock: "GrimAge", bioAge: 45.8, chronoAge: 42 },
  { clock: "DunedinPACE", bioAge: 47.6, chronoAge: 42 },
];

export default function MethylationView() {
  const { report } = useHealthStore();
  const { methylation } = report;
  const sc: Record<string, string> = { Low: "#22c55e", Moderate: "#f59e0b", High: "#ef4444" };
  const color = sc[methylation.status] ?? "#f59e0b";

  return (
    <div className="p-6 space-y-6 animate-fade-up">
      <div>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, color: "var(--color-text-primary)", marginBottom: 4 }}>
          DNA Methylation Analysis
        </h2>
        <p style={{ fontSize: 13, color: "var(--color-text-muted)" }}>
          Epigenetic clock comparison and methylation site analysis
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 14, color: "var(--color-text-primary)", marginBottom: 16 }}>
            Methylation Score
          </h3>
          <div className="flex items-center gap-8 mb-6">
            <div>
              <div style={{ fontSize: 10, color: "var(--color-text-muted)", marginBottom: 4 }}>Your Score</div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 52, color, lineHeight: 1 }}>
                {methylation.score}
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <div style={{ fontSize: 10, color: "var(--color-text-muted)" }}>Biological Age</div>
                <div style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 22, color: "var(--color-accent-blue)" }}>
                  {methylation.biologicalAge} yrs
                </div>
              </div>
              <div>
                <div style={{ fontSize: 10, color: "var(--color-text-muted)" }}>Chronological Age</div>
                <div style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 22, color: "var(--color-accent-cyan)" }}>
                  {methylation.chronologicalAge} yrs
                </div>
              </div>
            </div>
          </div>
          <div className="relative h-3 rounded-full overflow-hidden mb-2"
            style={{ background: "linear-gradient(to right, #22c55e, #f59e0b, #ef4444)" }}>
            <motion.div
              className="absolute top-0 w-4 h-4 rounded-full border-2 -translate-y-0.5"
              initial={{ left: "0%" }}
              animate={{ left: `calc(${Math.min(methylation.score, 1) * 100}% - 8px)` }}
              transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
              style={{ background: color, borderColor: "var(--color-surface-2)" }}
            />
          </div>
          <div className="flex justify-between text-xs" style={{ color: "var(--color-text-muted)" }}>
            <span>0.0 (Young)</span><span>1.0 (Aged)</span>
          </div>
        </div>

        <div className="card">
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 14, color: "var(--color-text-primary)", marginBottom: 16 }}>
            Epigenetic Clock Comparison
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={clockData} layout="vertical" barCategoryGap="20%">
              <XAxis type="number" domain={[35, 55]} tick={{ fill: "var(--color-text-muted)", fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis type="category" dataKey="clock" tick={{ fill: "var(--color-text-secondary)", fontSize: 10 }} tickLine={false} axisLine={false} width={80} />
              <Tooltip
                formatter={(val: number | string | undefined, name: string) => {
                  const safeVal = typeof val === "number" ? val : Number(val) || 0;

                  return [
                    `${safeVal} yrs`,
                    name === "bioAge" ? "Biological" : "Chronological",
                  ];
                }}
                contentStyle={{
                  background: "var(--color-surface-3)",
                  border: "1px solid var(--color-border-2)",
                  borderRadius: 8,
                  fontSize: 11,
                }}
              />
              <Bar dataKey="chronoAge" fill="oklch(from #38d9c0 l c h / 0.3)" radius={[0, 3, 3, 0]} />
              <Bar dataKey="bioAge" fill="oklch(from #4f8ef7 l c h / 0.75)" radius={[0, 3, 3, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-4 mt-2 justify-end">
            {[{ c: "oklch(from #38d9c0 l c h / 0.5)", l: "Chronological" }, { c: "oklch(from #4f8ef7 l c h / 0.75)", l: "Biological" }].map((i) => (
              <div key={i.l} className="flex items-center gap-1.5">
                <div className="w-3 h-2 rounded-sm" style={{ background: i.c }} />
                <span style={{ fontSize: 10, color: "var(--color-text-muted)" }}>{i.l}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card md:col-span-2">
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 14, color: "var(--color-text-primary)", marginBottom: 16 }}>
            Key Methylation Sites
          </h3>
          <div className="space-y-4">
            {methylationSites.map((site) => {
              const diff = site.methylation - site.expected;
              const c = diff > 10 ? "#ef4444" : diff > 5 ? "#f59e0b" : "#22c55e";
              return (
                <div key={site.gene}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div>
                      <span style={{ fontSize: 12, fontWeight: 700, color: "var(--color-text-primary)", fontFamily: "var(--font-mono)" }}>
                        {site.gene}
                      </span>
                      <span style={{ fontSize: 10, color: "var(--color-text-muted)", marginLeft: 8 }}>{site.label}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span style={{ fontSize: 10, color: "var(--color-text-muted)" }}>Expected: {site.expected}%</span>
                      <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 14, color: c }}>{site.methylation}%</span>
                      {diff !== 0 && <span style={{ fontSize: 10, color: c, fontWeight: 600 }}>{diff > 0 ? "+" : ""}{diff}%</span>}
                    </div>
                  </div>
                  <div style={{ height: 6, background: "var(--color-border)", borderRadius: 3, position: "relative", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${site.expected}%`, background: "oklch(from #38d9c0 l c h / 0.3)", borderRadius: 3 }} />
                    <div style={{ position: "absolute", top: 0, height: "100%", width: `${site.methylation}%`, background: c, borderRadius: 3, opacity: 0.7 }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
