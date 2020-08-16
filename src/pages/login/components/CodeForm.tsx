import React, { useEffect } from 'react';
import { useImmer } from 'use-immer';
import { Form, Button, Input, message, Col, Row } from 'antd';
import { StarOutlined } from '@ant-design/icons';
import { phoneValidator, normalValidator } from '@/utils/validators';
import { reqGetAuthCode } from '@/services/user';
interface LoginProps {
  onLogin: (username: string, password: string) => void;
  loading?: boolean;
}

const useForm = Form.useForm;

const CodeForm: React.FC<LoginProps> = ({ onLogin, loading }) => {
  const [state, setState] = useImmer({
    authTime: 0,
    submitDisabled: true,
  });
  const [form] = useForm();
  const getAuthCode = async () => {
    if (state.authTime) return;
    await form.validateFields(['phone']);
    setState(state => {
      state.authTime = 60;
    });
    const res = await reqGetAuthCode(form.getFieldValue('phone'));
    if (res) {
      message.success({
        duration: 60,
        content: `验证码为 ${res.authCode}（忽略大小写）`,
      });
    }
  };
  const handleLogin = (valuse: AnyObject<string>) => {
    const { phone, code } = valuse;
    onLogin(phone, code);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (state.authTime > 0) {
      timer = setTimeout(() => {
        setState(state => {
          state.authTime--;
        });
      }, 1000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [state.authTime, setState]);
  return (
    <Form
      form={form}
      initialValues={{
        phone: '13496035481',
      }}
      labelCol={{
        span: 5,
      }}
      onFinish={handleLogin}
      onFieldsChange={currents => {
        const current = currents[0];
        if (current && current.name.toString() === 'code') {
          if (current.value.length === 4) {
            setState(state => {
              state.submitDisabled = false;
            });
          } else {
            setState(state => {
              state.submitDisabled = true;
            });
          }
        }
      }}
    >
      <Form.Item name="phone" label="手机号" rules={[phoneValidator()]}>
        <Input
          prefix={<span style={{ color: '#aaa' }}>+86</span>}
          placeholder="Phone"
          autoComplete="on"
        />
      </Form.Item>
      <Form.Item label="验证码" required>
        <Row align="middle" justify="space-between">
          <Col span={14}>
            <Form.Item
              noStyle
              name="code"
              rules={[
                normalValidator('请输入4位验证码', {
                  len: 4,
                }),
              ]}
            >
              <Input
                prefix={<StarOutlined />}
                placeholder="AuthCode"
                autoComplete="off"
              />
            </Form.Item>
          </Col>
          <Col span={9} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              disabled={state.authTime > 0 ? true : false}
              type="primary"
              onClick={getAuthCode}
            >
              {state.authTime
                ? `${state.authTime}s 后可再次获取`
                : '获取验证码'}
            </Button>
          </Col>
        </Row>
      </Form.Item>
      <Form.Item>
        <Button
          style={{ width: '100%' }}
          type="primary"
          disabled={state.submitDisabled}
          htmlType="submit"
          loading={loading}
        >
          {loading ? '正在' : ''}登陆
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CodeForm;
