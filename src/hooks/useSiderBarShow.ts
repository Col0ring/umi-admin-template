import { useState, useEffect } from 'react';
const useSiderBarShow = () => {
  const [isShow, setIsShow] = useState(window.innerWidth >= 576);
  function updateState() {
    setIsShow(window.innerWidth >= 576);
  }
  useEffect(() => {
    window.addEventListener('resize', updateState);
    return () => {
      window.removeEventListener('resize', updateState);
    };
  });
  return isShow;
};

export default useSiderBarShow;
