import { create } from "zustand";
import { mockHealthReport } from "@/lib/mock-data";
import type { HealthReport, ViewTab } from "@/types/health";

interface HealthStore {
  report: HealthReport;
  activeTab: ViewTab;
  sidebarOpen: boolean;
  notificationsOpen: boolean;
  isRefreshing: boolean;
  highlightedRisk: string | null;

  setActiveTab: (tab: ViewTab) => void;
  toggleSidebar: () => void;
  toggleNotifications: () => void;
  setHighlightedRisk: (risk: string | null) => void;
  refreshData: () => Promise<void>;
}

export const useHealthStore = create<HealthStore>()((set) => ({
  report: mockHealthReport,
  activeTab: "overview",
  sidebarOpen: false,
  notificationsOpen: false,
  isRefreshing: false,
  highlightedRisk: null,

  setActiveTab: (tab) =>
    set({ activeTab: tab }),

  toggleSidebar: () =>
    set((s) => ({ sidebarOpen: !s.sidebarOpen })),

  toggleNotifications: () =>
    set((s) => ({ notificationsOpen: !s.notificationsOpen })),

  setHighlightedRisk: (risk) =>
    set({ highlightedRisk: risk }),

  refreshData: async () => {
    set({ isRefreshing: true });
    await new Promise((r) => setTimeout(r, 1800));
    set((s) => ({
      isRefreshing: false,
      report: {
        ...s.report,
        inflammation: {
          ...s.report.inflammation,
          dnamCRP: parseFloat(
            (s.report.inflammation.dnamCRP + (Math.random() * 0.4 - 0.2)).toFixed(1)
          ),
        },
      },
    }));
  },
}));
