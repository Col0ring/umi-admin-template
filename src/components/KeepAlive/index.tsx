import React, { useEffect, useState } from 'react';
import { IRouteComponentProps, useLocation } from 'umi';
import Container from './Container';
const KeepAliveContainer: React.FC<IRouteComponentProps> = ({
  children,
  ...rest
}) => {
  const { pathname, search } = useLocation();

  const [cachePaths, setCachePaths] = useState([pathname + search]);

  useEffect(() => {
    if (!cachePaths.includes(pathname + search)) {
      setCachePaths([...cachePaths, pathname + search]);
    }
  }, [pathname, search]);

  return (
    <>
      {cachePaths.includes(pathname + search) ? (
        <Container {...(rest as any)}>{children}</Container>
      ) : (
        children
      )}
    </>
  );
};

export default KeepAliveContainer;
