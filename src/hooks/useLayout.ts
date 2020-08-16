import { useContext } from 'react';
import { LayoutContext } from '@/wrappers/LayoutProviderWrapper';
const useLayout = () => {
  const layoutState = useContext(LayoutContext);
  return layoutState;
};

export default useLayout;
