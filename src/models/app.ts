import { Effect, Reducer, Subscription } from 'umi';
import { progressDone, progressStart } from '@/utils/nprogress';
import { getLayoutData, LayoutData } from '@/utils/app';
import { ConvertedMenus, MenuItem } from '@/interfaces/app';
import { matchPath } from 'react-router-dom';
import setting from '@/setting';
function pushTabPane(tabPanes: MenuItem[], pane: MenuItem, path: string) {
  pane = { ...pane };
  pane.displayPath = path;
  const idx = tabPanes.findIndex(item =>
    matchPath(item.displayPath, { path: pane.displayPath, exact: true }),
  );
  if (idx === -1) {
    return [...tabPanes, pane];
  }
  const clone = [...tabPanes];
  clone.splice(idx, 1, pane);
  return clone;
}

export interface AppModelState extends LayoutData {
  title: string;
  collapsed: boolean;
  selectedKeys: string[];
  tabKeys: string[];
  openKeys: string[];
  breadCrumbs: MenuItem[];
  tabPanes: MenuItem[];
}

interface AppModelType {
  state: AppModelState;
  reducers: {
    closeProgress: Reducer;
    toggleCollapse: Reducer<AppModelState>;
    setLayoutData: Reducer<AppModelState>;
    setOpenKeys: Reducer<AppModelState>;
    setTabKeys: Reducer<AppModelState>;
    setBreadCrumbs: Reducer<AppModelState>;
    setTabPanes: Reducer<AppModelState>;
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
    title: setting.menuTitle,
    collapsed:
      Number(localStorage.getItem('appCollapsed')) === 1 ? true : false,
    convertedMenus: {},
    openKeysMap: {},
    breadCrumbsMap: {},
    selectedKeys: [],
    tabKeys: [],
    openKeys: [],
    breadCrumbs: [],
    tabPanes: JSON.parse(localStorage.getItem('appTabPanes') ?? '[]'),
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
    setTabPanes(state, { payload }) {
      localStorage.setItem('appTabPanes', JSON.stringify(payload));
      // console.log(payload);
      return { ...state!, tabPanes: payload };
    },
    setOpenKeys(state, { payload }) {
      return { ...state!, openKeys: payload };
    },
    setSelectedKeys(state, { payload }) {
      return { ...state!, selectedKeys: payload };
    },
    setTabKeys(state, { payload }) {
      return { ...state!, tabKeys: payload };
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
        // setTimeout(() => {
        //   document.title = setting.menuTitle + ` - ${title}`;
        // });
        return { ...state!, title };
      }
      return state!;
    },
  },
  effects: {
    *setCurrentLayoutData({ payload }, { put, select }) {
      const state: AppModelState = yield select((state: any) => state.app);
      let selectedKeys: string[] = [];
      let openKeys: string[] = [];
      let breadCrumbs: ConvertedMenus[] = [];
      const { convertedMenus, openKeysMap, breadCrumbsMap, tabPanes } = state;
      let currentTabPanes = tabPanes;
      if (convertedMenus[payload]) {
        if (openKeysMap[payload]) {
          openKeys = openKeysMap[payload];
        }
        const current = convertedMenus[payload];
        selectedKeys = [current[current.length - 1].activePath || payload];

        currentTabPanes = pushTabPane(
          currentTabPanes,
          current[current.length - 1],
          payload,
        );

        breadCrumbs = breadCrumbsMap[payload];
      } else {
        Object.keys(convertedMenus).some(key => {
          if (matchPath(payload, { path: key, exact: true })) {
            // console.log(matchRoute);
            openKeys = openKeysMap[key];
            breadCrumbs = breadCrumbsMap[key];
            const current = convertedMenus[key];
            selectedKeys = [current[current.length - 1].activePath || key];

            currentTabPanes = pushTabPane(
              currentTabPanes,
              current[current.length - 1],
              payload,
            );

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
        type: 'setTabKeys',
        payload: [payload],
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
        type: 'setTabPanes',
        payload: currentTabPanes,
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
        // 切换页面时中断所有请求
        if (window._axiosPromiseArr && Array.isArray(window._axiosPromiseArr)) {
          window._axiosPromiseArr.forEach(cancel => {
            cancel();
          });
        }
        progressStart();
      });
    },
  },
};

export default AppModel;
