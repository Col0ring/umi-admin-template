import React, { useEffect, useState } from 'react';
import { useLocation } from 'umi';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
NProgress.configure({ showSpinner: false });

const PageProgressWrapper: React.FC = ({ children }) => {
  const location = useLocation();
  const [preLocation, setPreLocation] = useState<typeof location | null>(null);
  if (location !== preLocation) {
    NProgress.start();
    setPreLocation(location);
  }
  useEffect(() => {
    NProgress.done();
  }, [location]);
  return <>{children}</>;
};

export default PageProgressWrapper;
