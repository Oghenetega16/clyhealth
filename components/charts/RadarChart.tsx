"use client";
import { useState } from "react";
import type { RadarDimension } from "@/types/health";

interface Props {
  dimensions: RadarDimension[];
  size?: number;
}

function toXY(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg - 90) * (Math.PI / 180);
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

export default function RadarChart({ dimensions, size = 200 }: Props) {
  const [hovered, setHovered] = useState<number | null>(null);
  const cx = size / 2;
  const cy = size / 2;
  const maxR = size * 0.37;
  const levels = 4;
  const step = 360 / dimensions.length;

  const gridRing = (level: number) =>
    dimensions
      .map((_, i) => {
        const r = ((level + 1) / levels) * maxR;
        const p = toXY(cx, cy, r, i * step);
        return `${i === 0 ? "M" : "L"}${p.x},${p.y}`;
      })
      .join(" ") + " Z";

  const dataPath = dimensions
    .map((d, i) => {
      const r = (d.value / d.max) * maxR;
      const p = toXY(cx, cy, r, i * step);
      return `${i === 0 ? "M" : "L"}${p.x},${p.y}`;
    })
    .join(" ") + " Z";

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <defs>
          <linearGradient id="rfill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4f8ef7" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#38d9c0" stopOpacity="0.25" />
          </linearGradient>
        </defs>

        {/* Grid rings */}
        {Array.from({ length: levels }).map((_, l) => (
          <path key={l} d={gridRing(l)} fill="none" stroke="oklch(from #252b3b l c h / 0.7)" strokeWidth={1} />
        ))}

        {/* Axes */}
        {dimensions.map((_, i) => {
          const outer = toXY(cx, cy, maxR, i * step);
          return <line key={i} x1={cx} y1={cy} x2={outer.x} y2={outer.y} stroke="oklch(from #252b3b l c h / 0.5)" strokeWidth={1} />;
        })}

        {/* Filled area */}
        <path d={dataPath} fill="url(#rfill)" stroke="#4f8ef7" strokeWidth={2} strokeLinejoin="round" />

        {/* Data points */}
        {dimensions.map((d, i) => {
          const r = (d.value / d.max) * maxR;
          const p = toXY(cx, cy, r, i * step);
          return (
            <circle key={i} cx={p.x} cy={p.y}
              r={hovered === i ? 5.5 : 3.5}
              fill={hovered === i ? "#38d9c0" : "#4f8ef7"}
              stroke="var(--color-surface-2)" strokeWidth={2}
              style={{ cursor: "pointer", transition: "r 0.15s" }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            />
          );
        })}

        {/* Labels */}
        {dimensions.map((d, i) => {
          const p = toXY(cx, cy, maxR + 22, i * step);
          return (
            <text key={i} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="middle"
              fill={hovered === i ? "var(--color-text-primary)" : "var(--color-text-secondary)"}
              fontSize={9} fontFamily="var(--font-body)" fontWeight={500}
              style={{ transition: "fill 0.15s" }}>
              {d.label}
            </text>
          );
        })}
      </svg>

      {hovered !== null && (
        <div
          className="absolute pointer-events-none rounded-xl animate-scale-in"
          style={{
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            background: "var(--color-surface-3)",
            border: "1px solid var(--color-border-2)",
            padding: "6px 12px", fontSize: 12, zIndex: 10,
          }}>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "var(--color-text-primary)", marginBottom: 2 }}>
            {dimensions[hovered].label}
          </div>
          <div style={{ color: "var(--color-accent-cyan)", fontFamily: "var(--font-mono)" }}>
            {dimensions[hovered].value}/{dimensions[hovered].max}
          </div>
        </div>
      )}
    </div>
  );
}
