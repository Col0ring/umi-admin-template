import React, { useEffect, useState } from 'react';
import { useLocation, useRouteMatch } from 'umi';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
NProgress.configure({ showSpinner: false });

const PageProgressWrapper: React.FC = ({ children }) => {
  const location = useLocation();
  const [preLocation, setPreLocation] = useState<typeof location | null>(null);
  // console.log(location);
  // console.log(useRouteMatch(location.pathname + location.search));
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
