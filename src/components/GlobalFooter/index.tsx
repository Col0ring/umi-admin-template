import React from 'react';
import styles from './index.less';
interface GlobalFooterProps {}

const GlobalFooter: React.FC<GlobalFooterProps> = () => {
  return <div className={styles.globalFooter}>Umi Admin © 2020</div>;
};

export default GlobalFooter;
