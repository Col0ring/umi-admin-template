import { createContext } from 'react';

export interface AccessLayoutContextValue {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  toggleFull: () => void;
}

const AccessLayoutContext = createContext<AccessLayoutContextValue>({
  toggleFull: () => {},
  setCollapsed: () => {},
  collapsed: false,
});

export default AccessLayoutContext;
