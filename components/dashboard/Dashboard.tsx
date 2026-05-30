"use client";
import { AnimatePresence, motion } from "motion/react";
import { useHealthStore } from "@/store/health-store";
import TopBar from "@/components/layout/TopBar";
import Sidebar from "@/components/layout/Sidebar";
import TabNav from "@/components/layout/TabNav";
import OverviewView from "./OverviewView";
import ImmunityView from "./ImmunityView";
import InflammationView from "./InflammationView";
import MethylationView from "./MethylationView";
import TelomereView from "./TelomereView";

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -6 },
};

export default function Dashboard() {
  const { activeTab, isRefreshing } = useHealthStore();

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-bg)", display: "flex", flexDirection: "column" }}>
      <TopBar />
      <TabNav />

      <main className="flex-1 overflow-auto relative">
        {/* Refresh overlay */}
        <AnimatePresence>
          {isRefreshing && (
            <motion.div
              key="refresh"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none"
              style={{ background: "oklch(from var(--color-bg) l c h / 0.6)", backdropFilter: "blur(4px)" }}>
              <div
                className="w-10 h-10 rounded-full border-2"
                style={{
                  borderColor: "var(--color-border-2)",
                  borderTopColor: "var(--color-accent-blue)",
                  animation: "spin 0.9s linear infinite",
                }}
              />
              <span style={{ fontSize: 12, color: "var(--color-text-secondary)", marginTop: 12 }}>
                Refreshing data…
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tab content with page transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.22, ease: "easeOut" }}>
            {activeTab === "overview"    && <OverviewView />}
            {activeTab === "immunity"    && <ImmunityView />}
            {activeTab === "inflammation" && <InflammationView />}
            {activeTab === "methylation" && <MethylationView />}
            {activeTab === "telomere"    && <TelomereView />}
          </motion.div>
        </AnimatePresence>
      </main>

      <Sidebar />
    </div>
  );
}
