import * as React from 'react';
import { createContext, useContext } from 'react';

import rootStore, { RootStore } from '@store/RootStore';

const RootStoreContext = createContext<RootStore | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

export const RootStoreProvider: React.FC<Props> = ({ children }) => <RootStoreContext.Provider value={rootStore}>{children}</RootStoreContext.Provider>;

export const useRootStore = () => {
  const context = useContext(RootStoreContext);
  if (!context) {
    throw new Error('useRootStore must be used within a RootStoreProvider');
  }
  return context;
};
