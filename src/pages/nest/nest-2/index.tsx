import React from 'react';
import { Alert } from 'antd';

const Nest2: React.FC = ({ children }) => {
  return (
    <>
      <Alert type="success" message="nest2" />
      <Alert type="error" message={children} />
    </>
  );
};

export default Nest2;
