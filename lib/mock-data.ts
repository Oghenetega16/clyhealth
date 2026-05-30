import type { HealthReport } from "@/types/health";

export const mockHealthReport: HealthReport = {
  userId: "usr_01",
  name: "Alex",
  biologicalAge: 47,
  chronologicalAge: 42,
  agingSpeed: 5,
  percentile: 74,
  radarDimensions: [
    { label: "Liver", value: 72, max: 100 },
    { label: "Metabolic", value: 65, max: 100 },
    { label: "Lipid", value: 78, max: 100 },
    { label: "Neuro-immune", value: 55, max: 100 },
    { label: "Kidney", value: 80, max: 100 },
  ],
  diseaseRisks: [
    { name: "Cancer", score: 4.94, color: "#ef4444" },
    { name: "COPD", score: 14.45, color: "#f97316" },
    { name: "Stroke", score: 17.54, color: "#a855f7" },
    { name: "Type 2 Diabetes", score: 17.32, color: "#f59e0b" },
    { name: "Heart Disease", score: 34.21, color: "#ef4444" },
  ],
  telomere: {
    length: 5.2,
    unit: "Kb",
    grade: "Medium",
    typicalAge: 50,
    history: [
      { age: 10, length: 6.8 },
      { age: 20, length: 6.4 },
      { age: 30, length: 5.9 },
      { age: 40, length: 5.5 },
      { age: 50, length: 5.2 },
      { age: 60, length: 4.7 },
    ],
  },
  methylation: {
    score: 0.76,
    biologicalAge: 47,
    chronologicalAge: 42,
    status: "Moderate",
  },
  immunity: {
    tCellsTotal: { min: 60, max: 80 },
    cd4HelperT: { min: 30, max: 60 },
    cd8CytotoxicT: { min: 20, max: 40 },
    bCells: { min: 5, max: 15 },
    monocytes: { min: 2, max: 10 },
    yourTCells: 68,
    cd4cd8Ratio: { value: 1.4, status: "Suboptimal" },
    lymphocyteMonocyte: { value: 3.7, status: "Normal" },
  },
  inflammation: {
    dnamCRP: 3.2,
    percentile: 75,
    status: "Above Average",
    history: [
      { date: "Jan", value: 2.1 },
      { date: "Feb", value: 2.8 },
      { date: "Mar", value: 2.5 },
      { date: "Apr", value: 3.0 },
      { date: "May", value: 2.9 },
      { date: "Jun", value: 3.2 },
      { date: "Jul", value: 3.4 },
      { date: "Aug", value: 2.5 },
    ],
    risks: [
      "Suggests an increased risk of cardiovascular disease and metabolic syndrome.",
      "Suggests an increased risk of cardiovascular disease and metabolic syndrome.",
      "Decreased vaccine efficacy.",
    ],
  },
  epigeneticGroups: [
    {
      name: "Histone Modifications Markers",
      color: "#4f8ef7",
      items: [
        { label: "FOXK1 Gene", sub: "Transcription Factor", risk: "moderate" },
        { label: "TNF-α", sub: "Tumor Necrosis Factor-alpha", risk: "high" },
        { label: "BRCA1 & BRCA2", sub: "Breast cancer gene", risk: "moderate" },
        { label: "IL-6", sub: "Interleukin-6", risk: "high" },
      ],
    },
    {
      name: "DNA Methylation Sites",
      color: "#a855f7",
      items: [
        { label: "ELOVL2", sub: "Aging clock gene", risk: "moderate" },
        { label: "FHL2", sub: "Heart/muscle gene", risk: "low" },
      ],
    },
  ],
  lastUpdated: "2024-03-15",
  cartItems: 5,
};

export const telomereReferenceData = [
  { age: 10, p25: 6.2, p50: 6.8, p75: 7.4 },
  { age: 20, p25: 5.8, p50: 6.4, p75: 7.0 },
  { age: 30, p25: 5.4, p50: 5.9, p75: 6.5 },
  { age: 40, p25: 5.0, p50: 5.5, p75: 6.0 },
  { age: 50, p25: 4.6, p50: 5.1, p75: 5.6 },
  { age: 60, p25: 4.2, p50: 4.7, p75: 5.2 },
];

export const inflammationTrend = [
  { month: "Jan", value: 2.1, ref: 2.0 },
  { month: "Feb", value: 2.8, ref: 2.0 },
  { month: "Mar", value: 2.5, ref: 2.0 },
  { month: "Apr", value: 3.0, ref: 2.0 },
  { month: "May", value: 2.9, ref: 2.0 },
  { month: "Jun", value: 3.2, ref: 2.0 },
  { month: "Jul", value: 3.4, ref: 2.0 },
  { month: "Aug", value: 2.5, ref: 2.0 },
];
