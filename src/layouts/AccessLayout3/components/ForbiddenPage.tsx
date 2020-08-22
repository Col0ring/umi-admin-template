import { Button, Result } from 'antd';
import React from 'react';
import { history } from 'umi';
const ForbiddenPage: React.FC<{}> = () => (
  <Result
    status="403"
    title="403"
    subTitle="对不起，您无法查看当前页面"
    extra={
      <Button type="primary" onClick={() => history.push('/')}>
        回到首页
      </Button>
    }
  />
);

export default ForbiddenPage;
