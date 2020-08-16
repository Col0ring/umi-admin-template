import React from 'react';
import { Form, Button, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { emptyValidator } from '@/utils/validators';
interface LoginProps {
  onLogin: (username: string, password: string) => void;
  loading?: boolean;
}

const PasswordForm: React.FC<LoginProps> = ({ onLogin, loading }) => {
  const handleLogin = (valuse: AnyObject<string>) => {
    const { username, password } = valuse;
    onLogin(username, password);
  };
  return (
    <Form
      initialValues={{
        username: 'admin',
        password: '123456',
      }}
      labelCol={{
        span: 5,
      }}
      onFinish={handleLogin}
    >
      <Form.Item
        name="username"
        label="用户名"
        rules={[emptyValidator('用户名')]}
      >
        <Input
          prefix={<UserOutlined />}
          placeholder="Username"
          autoComplete="username"
        />
      </Form.Item>
      <Form.Item name="password" label="密 码" rules={[emptyValidator('密码')]}>
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Password"
          autoComplete="current-password"
        />
      </Form.Item>
      <Form.Item>
        <Button
          style={{ width: '100%' }}
          type="primary"
          htmlType="submit"
          loading={loading}
        >
          {loading ? '正在' : ''}登陆
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PasswordForm;
