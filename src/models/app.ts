import { Effect, Reducer, Subscription } from 'umi';
import { progressDone, progressStart } from '@/utils/nprogress';
import { getLayoutData, LayoutData } from '@/utils/app';
import { ConvertedMenus } from '@/interfaces/app';
import { matchPath } from 'react-router-dom';
import setting from '@/setting';

export interface AppModelState extends LayoutData {
  collapsed: boolean;
  selectedKeys: string[];
  openKeys: string[];
  breadCrumbs: ConvertedMenus[];
}

interface AppModelType {
  state: AppModelState;
  reducers: {
    closeProgress: Reducer;
    toggleCollapse: Reducer<AppModelState>;
    setLayoutData: Reducer<AppModelState>;
    setOpenKeys: Reducer<AppModelState>;
    setBreadCrumbs: Reducer<AppModelState>;
    setSelectedKeys: Reducer<AppModelState>;
    setTitle: Reducer<AppModelState>;
  };
  effects: {
    setCurrentLayoutData: Effect;
  };
  subscriptions: {
    setup: Subscription;
  };
}

const AppModel: AppModelType = {
  state: {
    collapsed:
      Number(localStorage.getItem('appCollapsed')) === 1 ? true : false,
    convertedMenus: {},
    openKeysMap: {},
    breadCrumbsMap: {},
    selectedKeys: [],
    openKeys: [],
    breadCrumbs: [],
  },
  reducers: {
    closeProgress(state) {
      progressDone();
      return state;
    },
    toggleCollapse(state, { payload }) {
      localStorage.setItem('appCollapsed', payload ? '1' : '0');
      return { ...state!, collapsed: payload };
    },
    setLayoutData(state, { payload }) {
      return { ...state!, ...getLayoutData(payload) };
    },
    setBreadCrumbs(state, { payload }) {
      return { ...state!, breadCrumbs: payload };
    },
    setOpenKeys(state, { payload }) {
      return { ...state!, openKeys: payload };
    },
    setSelectedKeys(state, { payload }) {
      return { ...state!, selectedKeys: payload };
    },
    setTitle(state, { payload }) {
      const { convertedMenus } = state!;
      if (payload.length !== 0 && setting.autoGetTitle) {
        const selectedKey = payload[0];
        const title =
          convertedMenus[selectedKey][convertedMenus[selectedKey].length - 1]
            .title ||
          convertedMenus[selectedKey][convertedMenus[selectedKey].length - 1]
            .name;

        // 延时设置标题
        setTimeout(() => {
          document.title = setting.menuTitle + ` - ${title}`;
        });
      }
      return state!;
    },
  },
  effects: {
    *setCurrentLayoutData({ payload }, { put, select }) {
      const state = yield select((state: any) => state.app);
      let selectedKeys: string[] = [];
      let openKeys: string[] = [];
      let breadCrumbs: ConvertedMenus[] = [];
      const { convertedMenus, openKeysMap, breadCrumbsMap } = state;
      if (convertedMenus[payload]) {
        selectedKeys = [payload];
        if (openKeysMap[payload]) {
          openKeys = openKeysMap[payload];
        }
        breadCrumbs = breadCrumbsMap[payload];
      } else {
        Object.keys(convertedMenus).some(key => {
          if (matchPath(payload, { path: key })) {
            selectedKeys = [key];
            openKeys = openKeysMap[key];
            breadCrumbs = breadCrumbsMap[key];
            return true;
          }
          return false;
        });
      }
      yield put({
        type: 'setSelectedKeys',
        payload: selectedKeys,
      });
      yield put({
        type: 'setOpenKeys',
        payload: openKeys,
      });
      yield put({
        type: 'setBreadCrumbs',
        payload: breadCrumbs,
      });
      yield put({
        type: 'setTitle',
        payload: selectedKeys,
      });
    },
  },
  subscriptions: {
    setup({ history }) {
      history.listen(() => {
        progressStart();
      });
    },
  },
};

export default AppModel;
