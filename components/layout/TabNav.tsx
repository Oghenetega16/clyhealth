"use client";
import { motion } from "motion/react";
import { useHealthStore } from "@/store/health-store";
import { Menu } from "lucide-react";
import type { ViewTab } from "@/types/health";

const tabs: { id: ViewTab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "immunity", label: "Immunity" },
  { id: "inflammation", label: "Inflammation" },
  { id: "methylation", label: "Methylation" },
  { id: "telomere", label: "Telomere" },
];

export default function TabNav() {
  const { activeTab, setActiveTab, toggleSidebar } = useHealthStore();

  return (
    <div
      className="flex items-center overflow-x-auto"
      style={{ background: "var(--color-surface)", borderBottom: "1px solid var(--color-border)", padding: "0 24px" }}>

      {/* Hamburger */}
      <button
        aria-label="Menu icon"
        onClick={toggleSidebar}
        className="mr-3 w-7 h-7 flex items-center cursor-pointer justify-center rounded-lg transition-colors shrink-0 hover:bg-[var(--color-surface-2)]"
        style={{ color: "var(--color-text-muted)" }}>
        <Menu size={15} />
      </button>

      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="relative px-4 py-3 whitespace-nowrap transition-colors duration-200"
            style={{
              color: isActive ? "var(--color-text-primary)" : "var(--color-text-muted)",
              fontFamily: "var(--font-body)",
              fontSize: 13,
              fontWeight: isActive ? 600 : 400,
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}>
            {tab.label}
            {isActive && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 rounded-t-full"
                style={{ background: "linear-gradient(to right, var(--color-accent-blue), var(--color-accent-cyan))" }}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
