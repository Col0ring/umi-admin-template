import React, { useEffect } from 'react';
import { ConnectRC, connect } from 'umi';

const NProgressWrapper: ConnectRC = ({ location, children, dispatch }) => {
  useEffect(() => {
    dispatch!({
      type: 'app/closeProgress',
    });
  }, [location]);
  return <>{children}</>;
};

export default connect()(NProgressWrapper);
