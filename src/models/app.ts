import { Effect, Reducer, Subscription } from 'umi';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
NProgress.configure({ showSpinner: false });

export interface AppModelState {
  collapsed: boolean;
}

interface AppModelType {
  state: AppModelState;
  reducers: {
    closeProgress: Reducer;
    toggleCollapse: Reducer<AppModelState>;
  };
  effects: {};
  subscriptions: {
    setup: Subscription;
  };
}

const AppModel: AppModelType = {
  state: {
    collapsed:
      Number(localStorage.getItem('appCollapsed')) === 1 ? true : false,
  },
  reducers: {
    closeProgress(state) {
      NProgress.done();
      return state;
    },
    toggleCollapse(state, { payload }) {
      localStorage.setItem('appCollapsed', payload ? '1' : '0');
      return { ...state, collapsed: payload };
    },
  },
  effects: {},
  subscriptions: {
    setup({ history }) {
      history.listen(() => {
        NProgress.start();
      });
    },
  },
};

export default AppModel;
