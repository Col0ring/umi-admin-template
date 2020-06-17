import axios from 'axios';
import { history, getDvaApp } from 'umi';
import { message, Modal } from 'antd';
import { getToken } from '@/utils/auth';

const baseURL = '/api';
const service = axios.create({
  timeout: 26000,
  baseURL,
});

service.interceptors.request.use(
  config => {
    config.headers.token = getToken();
    return config;
  },
  (error: Error) => {
    message.error(error.message);
    return false;
  },
);

service.interceptors.response.use(
  response => {
    const data = response.data;
    if (data.code === 200) {
      return data;
    } else if (data.code === 401) {
      Modal.warning({
        title: '获取信息失败',
        content: data.msg,
        async onOk() {
          // 这里可以移动到 AuthWrapper 中，这种模式也不是 react 推荐的
          const app = getDvaApp();
          app._store.dispatch({
            type: 'permission/resetUser',
          });
        },
      });
      return false;
    } else {
      message.error(data.msg);
      return false;
    }
  },
  (error: Error) => {
    message.error(error.message);
    return false;
  },
);

export default service;
