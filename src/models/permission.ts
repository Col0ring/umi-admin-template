import { Effect, Reducer } from 'umi';
import { routerRedux } from 'dva';
import { getToken, setToken, removToken } from '@/utils/auth';
import {
  reqLoginByPassword,
  reqLoginByCode,
  reqGetUserInfo,
} from '@/services/user';

export interface UserProps {
  name: string;
  phone: string;
  email: string;
}
export interface AuthProps {
  isLogin: boolean;
  token: string | null;
  user: UserProps | null;
}

interface PermissionModelType {
  namesapce: string;
  state: AuthProps;
  reducers: {
    setToken: Reducer<AuthProps>;
    setUser: Reducer<AuthProps>;
  };
  effects: {
    login: Effect;
    getUserInfo: Effect;
    resetUser: Effect;
  };
}

const PermissionModel: PermissionModelType = {
  namesapce: 'permission',
  state: {
    isLogin: getToken() ? true : false,
    user: null,
    token: getToken(),
  },
  reducers: {
    setToken(state, { payload }) {
      return { ...state!, token: payload, isLogin: !!payload };
    },
    setUser(state, { payload }) {
      return { ...state!, user: payload };
    },
  },
  effects: {
    *login({ payload }, { call, put }) {
      let res;
      if (payload.type === 'password') {
        res = yield call(reqLoginByPassword, payload.data);
      } else if (payload.type === 'code') {
        res = yield call(reqLoginByCode, payload.data);
      }
      if (res) {
        yield put({
          type: 'setToken',
          payload: res.token,
        });
        setToken(res.token);
        yield put(routerRedux.push(payload.redirect || '/'));
      }
    },
    *getUserInfo(action, { call, put }) {
      const res = yield call(reqGetUserInfo);
      if (res) {
        yield put({
          type: 'setUser',
          payload: res.user,
        });
      }
    },
    *resetUser(action, { put }) {
      // request
      yield put({
        type: 'setToken',
        payload: '',
      });
      removToken();
      yield put({
        type: 'setUser',
        payload: null,
      });
    },
  },
};

export default PermissionModel;
