import React, { useEffect } from 'react';
import { useLocation, useDispatch } from 'umi';

const NProgressWrapper: React.FC = ({ children }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: 'app/closeProgress',
    });
  }, [location]);

  return <>{children}</>;
};

export default NProgressWrapper;
