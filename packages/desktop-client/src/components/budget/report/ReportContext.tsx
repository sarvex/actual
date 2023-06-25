import React, { type ReactNode, createContext, useContext } from 'react';

import * as monthUtils from 'loot-core/src/shared/months';

type ReportContext = {
  currentMonth: string;
  summaryCollapsed: boolean;
  onBudgetAction: (idx: number, action: string, arg: unknown) => void;
  onToggleSummaryCollapse: () => void;
};

let Context = createContext<ReportContext | null>(null);

type ReportProviderProps = {
  summaryCollapsed: boolean;
  onBudgetAction: (idx: number, action: string, arg: unknown) => void;
  onToggleSummaryCollapse: () => void;
  children: ReactNode;
};
export function ReportProvider({
  summaryCollapsed,
  onBudgetAction,
  onToggleSummaryCollapse,
  children,
}: ReportProviderProps) {
  let currentMonth = monthUtils.currentMonth();

  return (
    <Context.Provider
      value={{
        currentMonth,
        summaryCollapsed,
        onBudgetAction,
        onToggleSummaryCollapse,
      }}
      children={children}
    />
  );
}

export function useReport() {
  let value = useContext(Context);
  if (value === null) {
    throw new Error('useReport must be used within a ReportProvider');
  }
  return value;
}
