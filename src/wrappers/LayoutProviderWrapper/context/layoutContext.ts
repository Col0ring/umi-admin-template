import { createContext } from 'react';
import { LayoutState } from '../types';
const LayoutContext = createContext<LayoutState>({
  selectedKey: '',
  breadcrumbs: [],
  tabPanes: [],
  openKeys: [],
  tabKey: '',
});

export default LayoutContext;
