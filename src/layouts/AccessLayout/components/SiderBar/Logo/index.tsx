import React from 'react';
import { SketchOutlined } from '@ant-design/icons';
import styles from './index.less';
import { urlReg } from '@/utils/validators';
export interface LogoProps {
  title: string;
  logo: string;
}

const Logo: React.FC<LogoProps> = ({ title, logo }) => {
  const isUrl = urlReg.test(logo);
  return (
    <h1 className={styles.logo}>
      {logo ? (
        <img
          className={styles.logoImg}
          src={isUrl ? logo : require(`${logo}`)}
          alt="logo"
        />
      ) : (
        <SketchOutlined style={{ fontSize: 26 }} />
      )}

      <span style={{ marginLeft: 10 }}>{title}</span>
    </h1>
  );
};

export default Logo;
