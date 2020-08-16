import axios, { AxiosRequestConfig } from 'axios';
import { getDvaApp } from 'umi';
import { message, Modal } from 'antd';
import { getToken } from '@/utils/auth';

const baseURL = '/api';
const service = axios.create({
  timeout: 26000,
  baseURL,
});

function retry(config: AxiosRequestConfig) {
  if (config.headers.noRetry) {
    return false;
  }
  if (config.headers.retryCount <= 3) {
    return service(config);
  }
  return false;
}

function errorHandler(count: number, msg: string) {
  if (count > 3) {
    message.error(msg);
  }
}
service.interceptors.request.use(
  config => {
    if (window._axiosPromiseArr && Array.isArray(window._axiosPromiseArr)) {
      const index = window._axiosPromiseArr.findIndex(
        item => item.url === config.url,
      );
      const canceledRequest = window._axiosPromiseArr[index];
      if (canceledRequest) {
        canceledRequest.cancel();
        window._axiosPromiseArr.splice(index, 1);
      }
    }

    config.cancelToken = new axios.CancelToken(cancel => {
      window._axiosPromiseArr = window._axiosPromiseArr || [];
      window._axiosPromiseArr.push({ url: config.url, cancel });
    });

    config.headers.token = getToken();
    if (typeof config.headers.retryCount === 'number') {
      config.headers.retryCount++;
    } else {
      config.headers.retryCount = 0;
    }
    return config;
  },
  error => {
    errorHandler(error.config.headers.retryCount, error.message);
    return retry(error.config);
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
  error => {
    if (axios.isCancel(error)) {
      return false;
    }
    if (error.message.includes('timeout')) {
      error.message = '请求超时';
    }
    errorHandler(error.config.headers.retryCount, error.message);

    return retry(error.config);
  },
);

export default service;
