import { useContext } from 'react';
import LayoutContext from '../context/layoutContext';
const useLayout = () => {
  const LayoutState = useContext(LayoutContext);
  return LayoutState;
};

export default useLayout;
