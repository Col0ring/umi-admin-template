import { Effect, Reducer, matchPath, PermissionModelState } from 'umi';
import { getLayoutData, LayoutData } from '@/utils/app';
import { MenuItem } from '@/interfaces/app';
import setting from '@/setting';
import { matchRoles } from '@/utils/route';
import { Model } from 'dva';

function pushTabPane(tabPanes: MenuItem[], pane: MenuItem, path: string) {
  pane = { ...pane } as MenuItem;
  pane.displayPath = path;
  const idx = tabPanes.findIndex(item =>
    matchPath(item.displayPath, {
      path: path,
      exact: true,
    }),
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
  breadcrumbs: MenuItem[];
  tabPanes: MenuItem[];
}

interface AppModel extends Model {
  namespace: string;
  state: AppModelState;
  reducers: {
    toggleCollapse: Reducer<AppModelState>;
    setLayoutData: Reducer<AppModelState>;
    setOpenKeys: Reducer<AppModelState>;
    setTabKeys: Reducer<AppModelState>;
    setbreadcrumbs: Reducer<AppModelState>;
    setTabPanes: Reducer<AppModelState>;
    setSelectedKeys: Reducer<AppModelState>;
    setTitle: Reducer<AppModelState>;
  };
  effects: {
    setCurrentLayoutData: Effect;
  };
}

const appModel: AppModel = {
  namespace: 'app',
  state: {
    title: '',
    collapsed:
      Number(localStorage.getItem('appCollapsed')) === 1 ? true : false,
    convertedMenus: {},
    openKeysMap: {},
    breadcrumbsMap: {},
    selectedKeys: [],
    tabKeys: [],
    openKeys: [],
    breadcrumbs: [],
    tabPanes: JSON.parse(localStorage.getItem('appTabPanes') ?? '[]'),
  },
  reducers: {
    toggleCollapse(state, { payload }) {
      localStorage.setItem('appCollapsed', payload ? '1' : '0');
      return { ...state!, collapsed: payload };
    },
    setLayoutData(state, { payload }) {
      return { ...state!, ...getLayoutData(payload) };
    },
    setbreadcrumbs(state, { payload }) {
      return { ...state!, breadcrumbs: payload };
    },
    setTabPanes(state, { payload }) {
      localStorage.setItem('appTabPanes', JSON.stringify(payload));
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

        return { ...state!, title };
      }
      return { ...state!, title: '' };
    },
  },
  effects: {
    *setCurrentLayoutData({ payload }, { put, select }) {
      const {
        app,
        permission,
      }: {
        app: AppModelState;
        permission: PermissionModelState;
      } = yield select((state: any) => ({
        app: state.app,
        permission: state.permission,
      }));
      const { roles } = permission;
      let selectedKeys: string[] = [];
      let openKeys: string[] = [];
      let breadcrumbs: MenuItem[] = [];
      const { convertedMenus, openKeysMap, breadcrumbsMap, tabPanes } = app;
      let currentTabPanes = tabPanes;
      if (convertedMenus[payload]) {
        const current = convertedMenus[payload];
        if (current[current.length - 1].redirect) {
          return true;
        }
        if (openKeysMap[payload]) {
          openKeys = openKeysMap[payload];
        }
        selectedKeys = [current[current.length - 1].activeMenu || payload];

        if (
          !current[current.length - 1].routes ||
          !current[current.length - 1].hideInTabs
        ) {
          const tab = current[current.length - 1];
          if (tab.tabName || tab.name) {
            currentTabPanes = pushTabPane(currentTabPanes, tab, payload);
          }
        }

        breadcrumbs = breadcrumbsMap[payload];
      } else {
        let isRedirect = false;
        Object.keys(convertedMenus).some(key => {
          const pathname = payload.split('?')[0];
          if (matchPath(pathname, { path: key, exact: true })) {
            const current = convertedMenus[key];
            if (
              current[current.length - 1].redirect
              // current[current.length - 1].routes ||
            ) {
              isRedirect = true;
              return true;
            }
            if (openKeysMap[key]) {
              openKeys = openKeysMap[key];
            }
            breadcrumbs = breadcrumbsMap[key];
            selectedKeys = [current[current.length - 1].activeMenu || key];
            if (
              !current[current.length - 1].routes ||
              !current[current.length - 1].hideInTabs
            ) {
              const tab = current[current.length - 1];
              if (tab.tabName || tab.name) {
                currentTabPanes = pushTabPane(currentTabPanes, tab, payload);
              }
            }

            return true;
          }
          return false;
        });
        if (isRedirect) {
          return true;
        }
      }
      let isAuth = false;
      isAuth = breadcrumbs.every(bread => {
        if (matchRoles(roles, bread.roles)) {
          return true;
        }
        return false;
      });
      if (!isAuth) {
        yield put({
          type: 'setSelectedKeys',
          payload: [],
        });
        yield put({
          type: 'setTabKeys',
          payload: [],
        });
        yield put({
          type: 'setOpenKeys',
          payload: [],
        });
        yield put({
          type: 'setbreadcrumbs',
          payload: [],
        });
        yield put({
          type: 'setTitle',
          payload: [],
        });
        return false;
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
        type: 'setbreadcrumbs',
        payload: breadcrumbs,
      });
      yield put({
        type: 'setTabPanes',
        payload: currentTabPanes,
      });
      yield put({
        type: 'setTitle',
        payload: selectedKeys,
      });

      return true;
    },
  },
};

export default appModel;
