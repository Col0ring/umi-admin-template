import { useContext } from 'react';
import LayoutContext from '../contexts/LayoutContext';
const useLayout = () => {
  const { layoutState, setTabPanes } = useContext(LayoutContext);
  return { ...layoutState, setTabPanes };
};

export default useLayout;
