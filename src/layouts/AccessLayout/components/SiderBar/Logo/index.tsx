import React from 'react';
import { SketchOutlined } from '@ant-design/icons';
import styles from './index.less';
export interface LogoProps {
  title: string;
}

const Logo: React.FC<LogoProps> = ({ title }) => {
  return (
    <h1 className={styles.logo}>
      <SketchOutlined style={{ fontSize: 26 }} />
      <span style={{ marginLeft: 10 }}>{title}</span>
    </h1>
  );
};

export default Logo;
