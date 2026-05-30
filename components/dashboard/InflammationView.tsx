"use client";
import { useHealthStore } from "@/store/health-store";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, CartesianGrid } from "recharts";
import { inflammationTrend } from "@/lib/mock-data";

const TTip = ({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "var(--color-surface-3)", border: "1px solid var(--color-border-2)", borderRadius: 8, padding: "8px 12px", fontSize: 11 }}>
      <div style={{ color: "var(--color-text-muted)" }}>{label}</div>
      <div style={{ color: "#ef4444", fontFamily: "var(--font-mono)", fontWeight: 700 }}>{payload[0]?.value} mg/L</div>
    </div>
  );
};

export default function InflammationView() {
  const { report } = useHealthStore();
  const { inflammation } = report;

  const biomarkers = [
    { name: "CRP (C-Reactive Protein)", value: inflammation.dnamCRP, unit: "mg/L", normal: "< 1.0", status: "High", color: "#ef4444" },
    { name: "IL-6 (Interleukin-6)", value: 4.2, unit: "pg/mL", normal: "< 3.0", status: "Elevated", color: "#f97316" },
    { name: "TNF-α", value: 12.4, unit: "pg/mL", normal: "< 10.0", status: "Slightly High", color: "#f59e0b" },
    { name: "Fibrinogen", value: 340, unit: "mg/dL", normal: "200–400", status: "Normal", color: "#22c55e" },
    { name: "ESR", value: 28, unit: "mm/hr", normal: "< 20", status: "Elevated", color: "#f97316" },
  ];

  const sc: Record<string, string> = { Normal: "#22c55e", Elevated: "#f97316", High: "#ef4444", "Slightly High": "#f59e0b" };

  return (
    <div className="p-6 space-y-6 animate-fade-up">
      <div>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, color: "var(--color-text-primary)", marginBottom: 4 }}>
          Inflammatory Markers
        </h2>
        <p style={{ fontSize: 13, color: "var(--color-text-muted)" }}>
          Chronic inflammation via DNA methylation and blood markers
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card flex flex-col items-center justify-center py-8">
          <div style={{ fontSize: 11, color: "var(--color-text-muted)", marginBottom: 8 }}>DNAm CRP Score</div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 56, color: "#ef4444", lineHeight: 1 }}>
            {inflammation.dnamCRP}
          </div>
          <div style={{ fontSize: 14, color: "var(--color-text-muted)", marginTop: 4 }}>mg/L</div>
          <div className="mt-6 text-center">
            <div className="px-4 py-2 rounded-xl"
              style={{ background: "color-mix(in oklch, #ef4444 10%, transparent)", border: "1px solid color-mix(in oklch, #ef4444 28%, transparent)" }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#ef4444" }}>{inflammation.percentile}th</div>
              <div style={{ fontSize: 10, color: "var(--color-text-muted)" }}>Percentile</div>
            </div>
          </div>
        </div>

        <div className="card md:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 14, color: "var(--color-text-primary)" }}>
              8-Month Trend
            </h3>
            <span className="px-2 py-0.5 rounded text-xs font-semibold"
              style={{ background: "color-mix(in oklch, #ef4444 10%, transparent)", color: "#ef4444" }}>
              +14.2% ↑
            </span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={inflammationTrend}>
              <defs>
                <linearGradient id="ig2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: "var(--color-text-muted)", fontSize: 11 }} tickLine={false} axisLine={false} />
              <YAxis domain={[1.5, 4]} tick={{ fill: "var(--color-text-muted)", fontSize: 11 }} tickLine={false} axisLine={false} />
              <Tooltip content={<TTip />} />
              <ReferenceLine y={2.0} stroke="oklch(from #38d9c0 l c h / 0.5)" strokeDasharray="4 4" />
              <Area dataKey="value" stroke="#ef4444" strokeWidth={2.5} fill="url(#ig2)" dot={false} activeDot={{ r: 5, fill: "#ef4444" }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card md:col-span-3">
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 14, color: "var(--color-text-primary)", marginBottom: 16 }}>
            Inflammatory Biomarkers
          </h3>
          <div className="space-y-3">
            {biomarkers.map((bm) => {
              const c = sc[bm.status] ?? "#f59e0b";
              return (
                <div key={bm.name}
                  className="flex items-center gap-4 p-3 rounded-xl transition-colors hover:bg-[var(--color-surface-3)] cursor-default"
                  style={{ border: "1px solid var(--color-border)" }}>
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ background: bm.color }} />
                  <div className="flex-1">
                    <div style={{ fontSize: 12, fontWeight: 600, color: "var(--color-text-secondary)" }}>{bm.name}</div>
                    <div style={{ fontSize: 10, color: "var(--color-text-muted)" }}>Normal: {bm.normal} {bm.unit}</div>
                  </div>
                  <div className="text-right">
                    <div style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 16, color: bm.color }}>{bm.value}</div>
                    <div style={{ fontSize: 10, color: "var(--color-text-muted)" }}>{bm.unit}</div>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg text-xs font-semibold"
                    style={{ background: `color-mix(in oklch, ${c} 12%, transparent)`, color: c, border: `1px solid color-mix(in oklch, ${c} 28%, transparent)` }}>
                    {bm.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
