import React from 'react';
import { Layout } from 'antd';
const { Content } = Layout;

const MainContent: React.FC = ({ children }) => {
  return <Content className="app-container">{children}</Content>;
};

export default MainContent;
