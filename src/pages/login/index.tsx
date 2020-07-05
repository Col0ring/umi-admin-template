import React from 'react';
import { useSelector, useDispatch } from 'umi';
import ParticlesBg from 'particles-bg';
import { Tabs } from 'antd';
import PasswordForm from './components/PasswordForm';
import CodeForm from './components/CodeForm';
import LoginHeader from './components/LoginHeader';
import styles from './index.less';
import setting from '@/setting';

const { TabPane } = Tabs;

const Login: React.FC = () => {
  const { loading } = useSelector(({ loading }) => ({
    loading: loading.effects['permission/login'],
  }));
  const dispatch = useDispatch();

  const onPasswordLogin = (username: string, password: string) => {
    dispatch({
      type: 'permission/login',
      payload: {
        type: 'password',
        data: {
          username,
          password,
        },
      },
    });
  };
  const onCodeLogin = (phone: string, code: string) => {
    dispatch({
      type: 'permission/login',
      payload: {
        type: 'code',
        data: {
          phone,
          code,
        },
      },
    });
  };
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginForm}>
        <LoginHeader title={setting.menuTitle} className={styles.loginHeader} />
        <Tabs centered>
          <TabPane tab="验证码登陆" key="code">
            <CodeForm onLogin={onCodeLogin} loading={loading} />
          </TabPane>
          <TabPane tab="账号密码登陆" key="password">
            <PasswordForm onLogin={onPasswordLogin} loading={loading} />
          </TabPane>
        </Tabs>
      </div>
      <ParticlesBg bg type="cobweb" />
    </div>
  );
};

export default Login;
