import { useContext } from 'react';
import AccessLayoutContext from '../contexts/AccessLayoutContext';
const useAccessLayout = () => {
  const AccessLayoutValue = useContext(AccessLayoutContext);
  return AccessLayoutValue;
};

export default useAccessLayout;
