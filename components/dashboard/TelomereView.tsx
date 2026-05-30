"use client";
import { useHealthStore } from "@/store/health-store";
import TelomereChart from "@/components/charts/TelomereChart";

const comparisons = [
  { tissue: "Blood (Leukocytes)", length: 5.2, grade: "Medium", color: "#4f8ef7" },
  { tissue: "Buccal Cells", length: 5.8, grade: "Medium", color: "#38d9c0" },
  { tissue: "Saliva", length: 6.1, grade: "Good", color: "#22c55e" },
];

const lifestyleFactors = [
  { factor: "Exercise Frequency", impact: "+0.3 Kb", positive: true, detail: "Regular aerobic exercise preserves telomere length" },
  { factor: "Sleep Quality", impact: "-0.2 Kb", positive: false, detail: "Poor sleep accelerates telomere shortening" },
  { factor: "Chronic Stress", impact: "-0.4 Kb", positive: false, detail: "Cortisol promotes oxidative stress on telomeres" },
  { factor: "Diet Quality", impact: "+0.1 Kb", positive: true, detail: "Mediterranean diet associated with longer telomeres" },
  { factor: "Smoking (None)", impact: "+0.5 Kb", positive: true, detail: "Non-smoker advantage in telomere preservation" },
];

export default function TelomereView() {
  const { report } = useHealthStore();
  const { telomere } = report;
  const gc = telomere.grade === "Long" ? "#22c55e" : telomere.grade === "Medium" ? "#f59e0b" : "#ef4444";

  return (
    <div className="p-6 space-y-6 animate-fade-up">
      <div>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, color: "var(--color-text-primary)", marginBottom: 4 }}>
          Telomere Analysis
        </h2>
        <p style={{ fontSize: 13, color: "var(--color-text-muted)" }}>
          Chromosome cap length and cellular aging biomarker
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main metric card */}
        <div className="card flex flex-col items-center justify-center py-8">
          <div style={{ fontSize: 11, color: "var(--color-text-muted)", marginBottom: 8 }}>Telomere Length</div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 64, color: gc, lineHeight: 1 }}>
            {telomere.length}
          </div>
          <div style={{ fontSize: 16, color: "var(--color-text-muted)", marginTop: 2 }}>Kilobases (Kb)</div>
          <div className="mt-4 px-4 py-2 rounded-xl"
            style={{ background: `color-mix(in oklch, ${gc} 12%, transparent)`, border: `1px solid color-mix(in oklch, ${gc} 28%, transparent)` }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: gc, textAlign: "center" }}>{telomere.grade}</div>
            <div style={{ fontSize: 10, color: "var(--color-text-muted)", textAlign: "center" }}>Grade</div>
          </div>
          <div className="mt-4 text-center">
            <div style={{ fontSize: 11, color: "var(--color-text-muted)" }}>Equivalent to a</div>
            <div style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 18, color: "#f59e0b", marginTop: 2 }}>
              {telomere.typicalAge}-year-old
            </div>
          </div>
        </div>

        {/* Full reference chart */}
        <div className="card md:col-span-2">
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 14, color: "var(--color-text-primary)", marginBottom: 16 }}>
            Age-Adjusted Reference Chart
          </h3>
          <TelomereChart data={telomere} />
          <p style={{ fontSize: 10, color: "var(--color-text-muted)", marginTop: 8 }}>
            Shaded band shows 25th–75th percentile reference range. Red dashed line marks your chronological age.
          </p>
        </div>

        {/* Tissue comparison */}
        <div className="card">
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 14, color: "var(--color-text-primary)", marginBottom: 16 }}>
            By Tissue Type
          </h3>
          <div className="space-y-4">
            {comparisons.map((c) => (
              <div key={c.tissue}>
                <div className="flex items-center justify-between mb-1.5">
                  <span style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>{c.tissue}</span>
                  <div className="flex items-center gap-2">
                    <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 14, color: c.color }}>{c.length} Kb</span>
                    <span className="px-1.5 py-0.5 rounded text-xs font-semibold"
                      style={{ background: `color-mix(in oklch, ${c.color} 12%, transparent)`, color: c.color }}>{c.grade}</span>
                  </div>
                </div>
                <div style={{ height: 5, background: "var(--color-border)", borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${(c.length / 8) * 100}%`, background: c.color, borderRadius: 3, opacity: 0.7, transition: "width 1s ease-out" }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lifestyle impact */}
        <div className="card md:col-span-2">
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 14, color: "var(--color-text-primary)", marginBottom: 16 }}>
            Lifestyle Impact Factors
          </h3>
          <div className="space-y-3">
            {lifestyleFactors.map((f) => (
              <div key={f.factor}
                className="flex items-start gap-3 p-3 rounded-xl transition-colors cursor-default hover:bg-[var(--color-surface-3)]"
                style={{ border: "1px solid var(--color-border)" }}>
                <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                  style={{ background: f.positive ? "#22c55e" : "#ef4444" }} />
                <div className="flex-1">
                  <div style={{ fontSize: 12, fontWeight: 600, color: "var(--color-text-primary)" }}>{f.factor}</div>
                  <div style={{ fontSize: 11, color: "var(--color-text-muted)", marginTop: 2, lineHeight: 1.4 }}>{f.detail}</div>
                </div>
                <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 13, color: f.positive ? "#22c55e" : "#ef4444", flexShrink: 0 }}>
                  {f.impact}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
