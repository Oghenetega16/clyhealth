"use client";
import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { telomereReferenceData } from "@/lib/mock-data";
import type { TelomereData } from "@/types/health";

interface Props { data: TelomereData; compact?: boolean; }

const TTip = ({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number; color: string }[]; label?: string }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "var(--color-surface-3)", border: "1px solid var(--color-border-2)", borderRadius: 8, padding: "8px 12px", fontSize: 11 }}>
      <div style={{ color: "var(--color-text-muted)", marginBottom: 2 }}>Age {label}</div>
      {payload.map((p) => (
        <div key={p.name} style={{ color: p.color, fontFamily: "var(--font-mono)" }}>
          {p.name === "you" ? "You: " : "Avg: "}{p.value} Kb
        </div>
      ))}
    </div>
  );
};

export default function TelomereChart({ data, compact }: Props) {
  const [showRef, setShowRef] = useState(true);
  const chartData = telomereReferenceData.map((ref) => {
    const yours = data.history.find((h) => h.age === ref.age);
    return { age: ref.age, avg: ref.p50, band75: ref.p75, band25: ref.p25, you: yours?.length };
  });

  return (
    <div>
      {!compact && (
        <div className="flex items-center justify-between mb-3">
          <div className="flex gap-3">
            {[{ color: "#4f8ef7", label: "You" }, { color: "#38d9c0", label: "Average" }].map((l) => (
              <div key={l.label} className="flex items-center gap-1.5">
                <div className="w-3 h-px rounded" style={{ background: l.color }} />
                <span style={{ fontSize: 10, color: "var(--color-text-muted)" }}>{l.label}</span>
              </div>
            ))}
          </div>
          <button onClick={() => setShowRef(!showRef)}
            className="text-xs px-2 py-0.5 rounded-md transition-colors"
            style={{
              fontSize: 10,
              background: showRef ? "color-mix(in oklch, var(--color-accent-blue) 15%, transparent)" : "var(--color-surface-3)",
              color: showRef ? "var(--color-accent-blue)" : "var(--color-text-muted)",
              border: "1px solid var(--color-border)",
            }}>
            {showRef ? "Hide" : "Show"} range
          </button>
        </div>
      )}

      <ResponsiveContainer width="100%" height={compact ? 78 : 145}>
        <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -32, bottom: 0 }}>
          <defs>
            <linearGradient id="tgrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4f8ef7" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#4f8ef7" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="age" tick={{ fontSize: 9, fill: "var(--color-text-muted)" }} tickLine={false} axisLine={false} />
          <YAxis domain={[4, 8]} tick={{ fontSize: 9, fill: "var(--color-text-muted)" }} tickLine={false} axisLine={false} />
          {!compact && <Tooltip content={<TTip />} />}
          {showRef && <Area dataKey="band75" fill="oklch(from #38d9c0 l c h / 0.06)" stroke="none" />}
          {showRef && <Area dataKey="band25" fill="var(--color-surface-2)" stroke="oklch(from #38d9c0 l c h / 0.15)" strokeDasharray="3 3" strokeWidth={1} />}
          <Area dataKey="avg" stroke="oklch(from #38d9c0 l c h / 0.4)" strokeWidth={1} strokeDasharray="4 4" fill="none" dot={false} />
          <Area dataKey="you" stroke="#4f8ef7" strokeWidth={2} fill="url(#tgrad)"
            dot={{ fill: "#4f8ef7", r: 3, stroke: "var(--color-surface-2)", strokeWidth: 2 }}
            activeDot={{ r: 5, fill: "#38d9c0" }} />
          <ReferenceLine x={data.typicalAge} stroke="oklch(from #ef4444 l c h / 0.5)" strokeDasharray="3 3" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
