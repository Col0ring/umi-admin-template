import { Model } from 'dva';

export interface HelperModel extends Model {}

const helperModel: HelperModel = {
  namespace: 'helper',
  state: null,
  subscriptions: {
    axiosCancel({ history }) {
      history.listen(() => {
        // 切换页面时中断所有请求
        if (window._axiosPromiseArr && Array.isArray(window._axiosPromiseArr)) {
          window._axiosPromiseArr.forEach(({ cancel }) => {
            cancel();
          });
          window._axiosPromiseArr = [];
        }
      });
    },
  },
};

export default helperModel;
