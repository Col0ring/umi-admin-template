import { Effect, Reducer, Subscription } from 'umi';
import { progressDone, progressStart } from '@/utils/nprogress';
import { getLayoutData, LayoutData } from '@/utils/app';
import { ConvertedMenus } from '@/interfaces/app';

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
    setCurrentLayoutData: Reducer<AppModelState>;
    setOpenKeys: Reducer<AppModelState>;
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
    setCurrentLayoutData(state, { payload }) {
      let selectedKeys: string[] = [];
      let openKeys: string[] = [];
      let breadCrumbs: ConvertedMenus[] = [];

      if (state) {
        const { convertedMenus, openKeysMap, breadCrumbsMap } = state;
        if (convertedMenus[payload]) {
          selectedKeys = [payload];
          if (openKeysMap[payload]) {
            openKeys = openKeysMap[payload];
          }
          breadCrumbs = breadCrumbsMap[payload];
        } else {
          Object.keys(convertedMenus).some(key => {
            if (convertedMenus[key][0].pattern.test(payload)) {
              const currentKey =
                convertedMenus[key][0].key || convertedMenus[key][0].path;
              selectedKeys = [currentKey];
              openKeys = openKeysMap[currentKey];
              breadCrumbs = breadCrumbsMap[currentKey];
              return true;
            }
            return false;
          });
        }
      }
      if (state!.openKeys.length > 0) {
        return { ...state!, selectedKeys, breadCrumbs };
      }
      return { ...state!, selectedKeys, openKeys, breadCrumbs };
    },
    setOpenKeys(state, { payload }) {
      return { ...state!, openKeys: payload };
    },
  },
  effects: {},
  subscriptions: {
    setup({ history }) {
      history.listen(() => {
        progressStart();
      });
    },
  },
};

export default AppModel;
