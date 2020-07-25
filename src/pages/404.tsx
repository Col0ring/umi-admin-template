import { Button, Result } from 'antd';
import React from 'react';
import { history, dynamic } from 'umi';
dynamic(() => {});
const NoFoundPage: React.FC<{}> = () => (
  <Result
    status="404"
    title="404"
    subTitle="对不起，您当前的页面不存在。"
    extra={
      <Button type="primary" onClick={() => history.push('/')}>
        回到首页
      </Button>
    }
  />
);

export default NoFoundPage;
