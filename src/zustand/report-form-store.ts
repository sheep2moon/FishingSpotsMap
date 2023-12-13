import { type ReportTargetType } from "@prisma/client";
import { create } from "zustand";

type ReportFormStore = {
  isOpen: boolean;
  newReport: (targetType: ReportTargetType, targetId?: string) => void;
  close: () => void;
  targetId?: string;
  targetType: ReportTargetType;
};

export const useReportFormStore = create<ReportFormStore>((set) => ({
  isOpen: false,
  targetType: "GLOBAL",
  targetId: undefined,
  newReport: (targetType, targetId) =>
    set((state) => ({
      ...state,
      isOpen: true,
      targetType,
      targetId: targetId ? targetId : undefined,
    })),
  close: () => set((state) => ({ ...state, isOpen: false })),
}));
