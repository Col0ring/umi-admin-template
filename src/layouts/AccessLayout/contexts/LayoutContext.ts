import { createContext } from 'react';
import { LayoutState } from '@/interfaces/layouts';
export interface LayoutContextValue {
  layoutState: LayoutState;
  setTabPanes: (tabPanes: LayoutState['tabPanes']) => void;
}
const LayoutContext = createContext<LayoutContextValue>({
  layoutState: {
    selectedKey: '',
    breadcrumbs: [],
    tabPanes: [],
    openKeys: [],
    tabKey: '',
  },
  setTabPanes: () => {},
});

export default LayoutContext;
