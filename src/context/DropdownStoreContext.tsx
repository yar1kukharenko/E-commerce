import React, { createContext, ReactNode } from 'react';

import DropdownStore from '@store/MultiDropdownStore/MultiDropdownStore';

const DropdownStoreContext = createContext<DropdownStore | null>(null);

type Props = {
  children: ReactNode;
};

export const DropdownStoreProvider: React.FC<Props> = ({ children }) => {
  const dropdownStore = React.useMemo(() => new DropdownStore(), [DropdownStore]);

  return <DropdownStoreContext.Provider value={dropdownStore}>{children}</DropdownStoreContext.Provider>;
};

export default DropdownStoreContext;
