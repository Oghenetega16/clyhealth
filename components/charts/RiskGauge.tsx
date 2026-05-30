"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import type { DiseaseRisk } from "@/types/health";

interface Props {
  percentile: number;
  diseaseRisks: DiseaseRisk[];
  size?: number;
}

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg - 90) * (Math.PI / 180);
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arc(cx: number, cy: number, r: number, start: number, end: number) {
  const s = polar(cx, cy, r, start);
  const e = polar(cx, cy, r, end);
  const large = end - start > 180 ? 1 : 0;
  return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`;
}

export default function RiskGauge({ percentile, diseaseRisks, size = 260 }: Props) {
  const [ready, setReady] = useState(false);
  const cx = size / 2;
  const cy = size / 2 + 10;
  const r = size * 0.39;
  const sw = 13;
  const startA = -148;
  const endA = 148;
  const totalA = endA - startA;
  const circumference = (totalA / 360) * 2 * Math.PI * r;
  const fillFrac = ready ? percentile / 100 : 0;
  const dashOffset = circumference * (1 - fillFrac);
  const fillColor = percentile > 75 ? "#ef4444" : percentile > 50 ? "#f97316" : "#f59e0b";

  useEffect(() => { const t = setTimeout(() => setReady(true), 250); return () => clearTimeout(t); }, []);

  const riskPositions = [
    { x: "5%", y: "62%" },
    { x: "10%", y: "22%" },
    { x: "35%", y: "3%" },
    { x: "62%", y: "3%" },
    { x: "82%", y: "58%" },
  ];

  return (
    <div className="relative" style={{ width: size, height: size * 0.72 }}>
      <svg width={size} height={size * 0.72} viewBox={`0 0 ${size} ${size * 0.72}`}>
        <defs>
          <linearGradient id="gfill" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="50%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Track */}
        <path d={arc(cx, cy, r, startA, endA)} fill="none"
          stroke="oklch(from #252b3b l c h / 0.7)" strokeWidth={sw} strokeLinecap="round" />

        {/* Animated fill */}
        <path d={arc(cx, cy, r, startA, endA)} fill="none"
          stroke="url(#gfill)" strokeWidth={sw} strokeLinecap="round"
          filter="url(#glow)"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{ transition: "stroke-dashoffset 1.6s cubic-bezier(0.4,0,0.2,1)" }}
        />

        {/* Tick marks */}
        {[0, 25, 50, 75, 100].map((v) => {
          const a = startA + (v / 100) * totalA;
          const inner = polar(cx, cy, r + 3, a);
          const outer = polar(cx, cy, r + 10, a);
          return <line key={v} x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y} stroke="var(--color-border-2)" strokeWidth={1.5} />;
        })}

        {/* Center label */}
        <text x={cx} y={cy - 6} textAnchor="middle"
          fontSize={34} fontWeight={800} fontFamily="var(--font-display)" fill={fillColor}>
          {ready ? percentile : "0"}
        </text>
        <text x={cx} y={cy + 18} textAnchor="middle" fontSize={10} fontFamily="var(--font-body)" fill="var(--color-text-muted)">
          th Percentile
        </text>
        <text x={cx} y={cy + 31} textAnchor="middle" fontSize={10} fontFamily="var(--font-body)" fill="var(--color-text-muted)">
          Your risk of disease
        </text>
      </svg>

      {diseaseRisks.map((risk, i) => {
        const pos = riskPositions[i] ?? { x: "50%", y: "50%" };
        return <RiskBubble key={risk.name} risk={risk} style={{ position: "absolute", left: pos.x, top: pos.y }} />;
      })}
    </div>
  );
}

function RiskBubble({ risk, style }: { risk: DiseaseRisk; style?: React.CSSProperties }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      style={style}
      animate={{ scale: hov ? 1.1 : 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}>
      <div style={{
        background: "var(--color-surface-3)",
        border: `1px solid ${hov ? risk.color : "var(--color-border)"}`,
        borderRadius: 10,
        padding: "5px 9px",
        boxShadow: hov ? `0 0 14px ${risk.color}50` : "none",
        cursor: "default",
        transition: "border-color 0.2s, box-shadow 0.2s",
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: risk.color, fontFamily: "var(--font-mono)", textAlign: "center" }}>
          {risk.score}%
        </div>
        <div style={{ fontSize: 9, color: "var(--color-text-muted)", whiteSpace: "nowrap", marginTop: 1, textAlign: "center" }}>
          {risk.name}
        </div>
      </div>
    </motion.div>
  );
}
