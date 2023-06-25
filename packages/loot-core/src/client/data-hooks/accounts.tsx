import React, { createContext, useContext } from 'react';

import q from '../query-helpers';
import { useLiveQuery } from '../query-hooks';
import { getAccountsById } from '../reducers/queries';

function useAccounts(): unknown[] | null {
  return useLiveQuery(() => q('accounts').select('*'), []);
}

let AccountsContext = createContext<unknown[] | null>(null);

export function AccountsProvider({ children }) {
  let data = useAccounts();
  return <AccountsContext.Provider value={data} children={children} />;
}

export function CachedAccounts({ children, idKey }) {
  let data = useCachedAccounts({ idKey });
  return children(data);
}

export function useCachedAccounts({ idKey }: { idKey? } = {}): unknown[] {
  let data = useContext(AccountsContext);
  return idKey && data ? getAccountsById(data) : data;
}
