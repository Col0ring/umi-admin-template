import React from 'react';
import { Spin } from 'antd';
import styles from './index.less';
interface PageLoadingProps {
  tip: string;
}
const PageLoading: React.FC<PageLoadingProps> = ({ tip }) => {
  return (
    <div className={styles.pageLoading}>
      <Spin size="large" tip={tip}></Spin>
    </div>
  );
};
export default PageLoading;
