/*
 * @Author: Col0ring
 * @Date: 2020-06-08 17:21:45
 * @LastEditTime: 2020-06-11 00:55:05
 * @LastEditors: Col0ring
 * @FilePath: /src/pages/users/model.ts
 */

import { Reducer, Subscription, Effect } from 'umi';
import { message } from 'antd';
import {
  reqGetList,
  reqEditRecord,
  reqDeleteRecord,
  reqAddRecord,
} from './service';
import { SingleUserType } from './interface';

export interface UserState {
  data: SingleUserType[];
  meta: {
    total: number;
    per_page: number;
    page: number;
  };
}

interface UserModalType {
  namespace: string;
  state: UserState;
  reducers: {
    getList: Reducer<UserState>;
  };
  effects: {
    getRemote: Effect;
    add: Effect;
    edit: Effect;
    del: Effect;
  };
  subscriptions: {
    setup: Subscription;
  };
}

const UserModal: UserModalType = {
  namespace: 'users',
  state: {
    data: [],
    meta: {
      total: 0,
      per_page: 5,
      page: 1,
    },
  },
  reducers: {
    getList(state, { payload }) {
      return payload;
    },
  },
  effects: {
    *getRemote(action, { put, call }) {
      const res = yield call(reqGetList);
      if (res) {
        yield put({
          type: 'getList',
          payload: res,
        });
      }
    },
    *add({ payload }, { put, call }) {
      const res = yield call(reqAddRecord, payload.values);
      if (res) {
        yield put({
          type: 'getRemote',
        });
        message.success('Add Successfully');
      }
    },
    *edit({ payload }, { put, call }) {
      const res = yield call(reqEditRecord, payload.id, payload.values);
      if (typeof res === 'string' || res) {
        yield put({
          type: 'getRemote',
        });
        message.success('Edit Successfully');
      }
    },
    *del({ payload }, { put, call }) {
      const res = yield call(reqDeleteRecord, payload.id);
      if (typeof res === 'string' || res) {
        yield put({
          type: 'getRemote',
        });
        message.success('Delete Successfully');
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/users') {
          dispatch({
            type: 'getRemote',
            payload: {
              page: 1,
              per_page: 5,
            },
          });
        }
      });
    },
  },
};

export default UserModal;
