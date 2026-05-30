"use client";
import AgeReportPanel from "./AgeReportPanel";
import RiskGaugePanel from "./RiskGaugePanel";
import TelomerePanel from "./TelomerePanel";
import MethylationPanel from "./MethylationPanel";
import ImmunityPanel from "./ImmunityPanel";
import InflammationPanel from "./InflammationPanel";
import EpigeneticMarkersPanel from "./EpigeneticMarkersPanel";

export default function OverviewView() {
  return (
    <div className="p-6">
      {/* Top row */}
      <div className="flex flex-col lg:flex-row gap-4 mb-4">
        <AgeReportPanel />
        <RiskGaugePanel />
        <TelomerePanel />
      </div>

      {/* Bottom grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <MethylationPanel />
        <ImmunityPanel />
        <InflammationPanel />
        <EpigeneticMarkersPanel />
      </div>
    </div>
  );
}
