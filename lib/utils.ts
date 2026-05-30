import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getStatusColor(status: string): string {
  const s = status.toLowerCase();
  if (s === "optimal" || s === "low" || s === "normal") return "#22c55e";
  if (s === "moderate" || s === "suboptimal") return "#f59e0b";
  if (s === "high" || s === "above average") return "#ef4444";
  if (s === "critical") return "#dc2626";
  return "#8892a8";
}

export function getRiskColor(score: number): string {
  if (score < 5) return "#22c55e";
  if (score < 15) return "#f59e0b";
  if (score < 25) return "#f97316";
  return "#ef4444";
}
