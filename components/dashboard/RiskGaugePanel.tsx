"use client";
import { motion } from "motion/react";
import { useHealthStore } from "@/store/health-store";
import RiskGauge from "@/components/charts/RiskGauge";

export default function RiskGaugePanel() {
  const { report } = useHealthStore();
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
      className="card flex-1 flex items-center justify-center" style={{ minWidth: 300 }}>
      <RiskGauge percentile={report.percentile} diseaseRisks={report.diseaseRisks} size={300} />
    </motion.div>
  );
}
