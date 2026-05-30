export interface RadarDimension {
  label: string;
  value: number;
  max: number;
}

export interface TelomereData {
  length: number;
  unit: "Kb";
  grade: "Short" | "Medium" | "Long";
  typicalAge: number;
  history: { age: number; length: number }[];
}

export interface MethylationScore {
  score: number;
  biologicalAge: number;
  chronologicalAge: number;
  status: "Low" | "Moderate" | "High";
}

export interface ImmunityPanel {
  tCellsTotal: { min: number; max: number };
  cd4HelperT: { min: number; max: number };
  cd8CytotoxicT: { min: number; max: number };
  bCells: { min: number; max: number };
  monocytes: { min: number; max: number };
  yourTCells: number;
  cd4cd8Ratio: { value: number; status: "Suboptimal" | "Normal" | "Optimal" };
  lymphocyteMonocyte: { value: number; status: "Suboptimal" | "Normal" | "Optimal" };
}

export interface InflammationData {
  dnamCRP: number;
  percentile: number;
  status: "Low" | "Normal" | "Above Average" | "High";
  history: { date: string; value: number }[];
  risks: string[];
}

export interface DiseaseRisk {
  name: string;
  score: number;
  color: string;
}

export interface EpigeneticMarkerItem {
  label: string;
  sub: string;
  risk: "low" | "moderate" | "high";
}

export interface EpigeneticGroup {
  name: string;
  color: string;
  items: EpigeneticMarkerItem[];
}

export interface HealthReport {
  userId: string;
  name: string;
  biologicalAge: number;
  chronologicalAge: number;
  agingSpeed: number;
  percentile: number;
  radarDimensions: RadarDimension[];
  diseaseRisks: DiseaseRisk[];
  telomere: TelomereData;
  methylation: MethylationScore;
  immunity: ImmunityPanel;
  inflammation: InflammationData;
  epigeneticGroups: EpigeneticGroup[];
  lastUpdated: string;
  cartItems: number;
}

export type ViewTab =
  | "overview"
  | "immunity"
  | "inflammation"
  | "methylation"
  | "telomere";
