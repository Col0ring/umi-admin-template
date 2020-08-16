import { useState, useEffect } from 'react';
const useMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth >= 576);
  function updateState() {
    setIsMobile(window.innerWidth >= 576);
  }
  useEffect(() => {
    window.addEventListener('resize', updateState);
    return () => {
      window.removeEventListener('resize', updateState);
    };
  }, []);
  return isMobile;
};

export default useMobile;
