import { RouteState, LayoutState, LayoutRoute } from '@/interfaces/layouts';
import { matchPath } from 'umi';
function pushTabPane(tabPanes: LayoutRoute[], pane: LayoutRoute, path: string) {
  pane = { ...pane } as LayoutRoute;
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

const getLayoutState = (
  { pathsMap, openKeysMap, breadcrumbsMap }: RouteState,
  { tabPanes, openKeys: prevOpenKeys }: LayoutState,
  path: string,
): LayoutState | null => {
  let selectedKey: string = '';
  let openKeys: string[] = [];
  let breadcrumbs: LayoutState['breadcrumbs'] = [];
  let currentTabPanes = tabPanes;
  if (pathsMap[path]) {
    const current = pathsMap[path];
    if (current[current.length - 1].redirect) {
      return null;
    }
    if (openKeysMap[path]) {
      openKeys = openKeysMap[path];
    }
    selectedKey = current[current.length - 1].activeMenu || path;

    if (
      !current[current.length - 1].routes ||
      !current[current.length - 1].hideInTabs
    ) {
      const tab = current[current.length - 1];
      if (tab.tabName || tab.name) {
        currentTabPanes = pushTabPane(currentTabPanes, tab, path);
      }
    }
    breadcrumbs = breadcrumbsMap[path];
  } else {
    let isRedirect = false;
    Object.keys(pathsMap).some(key => {
      const pathname = path.split('?')[0];
      if (matchPath(pathname, { path: key, exact: true })) {
        const current = pathsMap[key];
        if (
          current[current.length - 1].redirect
          // current[current.length - 1].routes
        ) {
          isRedirect = true;
          return true;
        }
        if (openKeysMap[key]) {
          openKeys = openKeysMap[key];
        }
        breadcrumbs = breadcrumbsMap[key];
        selectedKey = current[current.length - 1].activeMenu || key;
        if (
          !current[current.length - 1].routes ||
          !current[current.length - 1].hideInTabs
        ) {
          const tab = current[current.length - 1];
          if (tab.tabName || tab.name) {
            currentTabPanes = pushTabPane(currentTabPanes, tab, path);
          }
        }

        return true;
      }
      return false;
    });
    if (isRedirect) {
      return null;
    }
  }
  if (selectedKey) {
    return {
      selectedKey,
      breadcrumbs,
      tabPanes: currentTabPanes,
      openKeys,
      tabKey: path,
    };
  } else {
    return {
      selectedKey: path,
      breadcrumbs,
      tabPanes: currentTabPanes,
      openKeys: prevOpenKeys,
      tabKey: path,
    };
  }
};

export default getLayoutState;
