import { Effect, Reducer } from 'umi';
import { routerRedux, Model } from 'dva';
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
export interface PermissionModelState {
  isLogin: boolean;
  roles: string[];
  token: string | null;
  user: UserProps | null;
}

interface PermissionModel extends Model {
  namespace: string;
  state: PermissionModelState;
  reducers: {
    setToken: Reducer<PermissionModelState>;
    setUser: Reducer<PermissionModelState>;
    setRoles: Reducer<PermissionModelState>;
  };
  effects: {
    login: Effect;
    getUserInfo: Effect;
    resetUser: Effect;
  };
}

const permissionModel: PermissionModel = {
  namespace: 'permission',
  state: {
    roles: [],
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
    setRoles(state, { payload }) {
      return { ...state!, roles: payload };
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
          type: 'setRoles',
          payload: res.roles,
        });
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

export default permissionModel;
