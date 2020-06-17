import React from 'react';
import { Button } from 'antd';
import { connect, ConnectRC } from 'umi';

const Login: ConnectRC = ({ dispatch }) => {
  const onLogin = () => {
    dispatch!({
      type: 'permission/login',
      payload: { username: 'admin', password: '123456' },
    });
  };
  return (
    <div>
      <Button onClick={onLogin}>登陆</Button>
    </div>
  );
};

export default connect()(Login);
