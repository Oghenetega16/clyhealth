"use client";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, LayoutDashboard, Activity, FlaskConical, Dna, Heart, Settings, HelpCircle, LogOut } from "lucide-react";
import { useHealthStore } from "@/store/health-store";
import type { ViewTab } from "@/types/health";

const navItems: { icon: React.ReactNode; label: string; tab: ViewTab }[] = [
  { icon: <LayoutDashboard size={15} />, label: "Overview", tab: "overview" },
  { icon: <Activity size={15} />, label: "Immunity", tab: "immunity" },
  { icon: <FlaskConical size={15} />, label: "Inflammation", tab: "inflammation" },
  { icon: <Dna size={15} />, label: "Methylation", tab: "methylation" },
  { icon: <Heart size={15} />, label: "Telomere", tab: "telomere" },
];

export default function Sidebar() {
  const { sidebarOpen, activeTab, setActiveTab, toggleSidebar } = useHealthStore();

  return (
    <AnimatePresence>
      {sidebarOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-20"
            style={{ background: "oklch(0 0 0 / 0.5)", backdropFilter: "blur(4px)" }}
            onClick={toggleSidebar}
          />

          {/* Panel */}
          <motion.aside
            key="sidebar"
            initial={{ x: -240 }}
            animate={{ x: 0 }}
            exit={{ x: -240 }}
            transition={{ type: "spring", stiffness: 340, damping: 32 }}
            className="fixed left-0 top-0 h-full z-30 w-56 flex flex-col"
            style={{ background: "var(--color-surface)", borderRight: "1px solid var(--color-border)" }}>

            <div className="flex items-center justify-between px-4 py-5 border-b" style={{ borderColor: "var(--color-border)" }}>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, color: "var(--color-text-primary)" }}>
                Navigation
              </span>
              <button
                aria-label="Toggle sidebar"
                onClick={toggleSidebar}
                className="w-6 h-6 flex items-center justify-center cursor-pointer rounded-lg transition-colors hover:bg-[var(--color-surface-3)]"
                style={{ color: "var(--color-text-muted)" }}>
                <ChevronLeft size={14} />
              </button>
            </div>

            <nav className="flex-1 px-3 py-4 space-y-1">
              {navItems.map((item) => {
                const isActive = activeTab === item.tab;
                return (
                  <button
                    key={item.label}
                    onClick={() => { setActiveTab(item.tab); toggleSidebar(); }}
                    className="w-full flex items-center gap-3 cursor-pointer px-3 py-2.5 rounded-xl transition-all duration-200 text-left"
                    style={{
                      color: isActive ? "var(--color-text-primary)" : "var(--color-text-secondary)",
                      background: isActive ? "color-mix(in oklch, var(--color-accent-blue) 15%, transparent)" : "transparent",
                      border: `1px solid ${isActive ? "color-mix(in oklch, var(--color-accent-blue) 30%, transparent)" : "transparent"}`,
                    }}>
                    <span style={{ color: isActive ? "var(--color-accent-blue)" : undefined }}>{item.icon}</span>
                    <span style={{ fontSize: 13, fontWeight: isActive ? 600 : 400 }}>{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="ml-auto w-1.5 h-1.5 rounded-full"
                        style={{ background: "var(--color-accent-blue)" }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            <div className="px-3 pb-4 space-y-1 border-t pt-4" style={{ borderColor: "var(--color-border)" }}>
              {[
                { icon: <Settings size={14} />, label: "Settings" },
                { icon: <HelpCircle size={14} />, label: "Help" },
                { icon: <LogOut size={14} />, label: "Sign Out" },
              ].map((item) => (
                <button key={item.label}
                  className="w-full flex items-center gap-3 px-3 py-2 cursor-pointer rounded-xl text-left transition-colors hover:bg-[var(--color-surface-2)]"
                  style={{ color: "var(--color-text-secondary)", fontSize: 13 }}>
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
