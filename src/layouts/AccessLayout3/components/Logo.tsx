import React from 'react';
import { SketchOutlined } from '@ant-design/icons';
import { Space } from 'antd';
export interface LogoProps {
  title: string;
  className: string;
}

const Logo: React.FC<LogoProps> = ({ title, className }) => {
  return (
    <h1 className={className}>
      <SketchOutlined style={{ fontSize: 26 }} />
      <span style={{ marginLeft: 10 }}>{title}</span>
    </h1>
  );
};

export default Logo;
