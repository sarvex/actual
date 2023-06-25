import React, { type ReactNode, createContext, useContext } from 'react';

import * as monthUtils from 'loot-core/src/shared/months';

type RolloverContextValue = {
  currentMonth: string;
  categoryGroups: unknown[];
  summaryCollapsed: boolean;
  onBudgetAction: (idx: number, action: string, arg?: unknown) => void;
  onToggleSummaryCollapse: () => void;
};

let Context = createContext<RolloverContextValue | null>(null);

type RolloverContextProps = Omit<RolloverContextValue, 'currentMonth'> & {
  children: ReactNode;
};
export function RolloverContext({
  categoryGroups,
  summaryCollapsed,
  onBudgetAction,
  onToggleSummaryCollapse,
  children,
}: RolloverContextProps) {
  let currentMonth = monthUtils.currentMonth();

  return (
    <Context.Provider
      value={{
        currentMonth,
        categoryGroups,
        summaryCollapsed,
        onBudgetAction,
        onToggleSummaryCollapse,
      }}
      children={children}
    />
  );
}

export function useRollover(): RolloverContextValue {
  let value = useContext(Context);
  if (value === null) {
    throw new Error('useRollover must be used within a RolloverContext');
  }
  return value;
}
