"use client";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { inflammationTrend } from "@/lib/mock-data";

const TTip = ({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "var(--color-surface-3)", border: "1px solid var(--color-border-2)", borderRadius: 8, padding: "7px 11px", fontSize: 11 }}>
      <div style={{ color: "var(--color-text-muted)" }}>{label}</div>
      <div style={{ color: "#ef4444", fontFamily: "var(--font-mono)", fontWeight: 700 }}>{payload[0]?.value} mg/L</div>
    </div>
  );
};

export default function InflammationChart() {
  return (
    <ResponsiveContainer width="100%" height={90}>
      <AreaChart data={inflammationTrend} margin={{ top: 4, right: 4, left: -32, bottom: 0 }}>
        <defs>
          <linearGradient id="igrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ef4444" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="month" tick={{ fontSize: 9, fill: "var(--color-text-muted)" }} tickLine={false} axisLine={false} />
        <YAxis domain={[1.5, 4]} tick={{ fontSize: 9, fill: "var(--color-text-muted)" }} tickLine={false} axisLine={false} />
        <Tooltip content={<TTip />} />
        <ReferenceLine y={2.0} stroke="oklch(from #38d9c0 l c h / 0.4)" strokeDasharray="3 3" />
        <Area dataKey="value" stroke="#ef4444" strokeWidth={2} fill="url(#igrad)" dot={false} activeDot={{ r: 4, fill: "#ef4444" }} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
