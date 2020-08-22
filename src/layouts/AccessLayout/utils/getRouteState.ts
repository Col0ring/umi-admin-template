import { IRoute } from 'umi';
import { RouteState, LayoutRoute } from '@/interfaces/layouts';

const getRouteState = (menus: IRoute[]): RouteState => {
  menus = JSON.parse(JSON.stringify(menus));
  const openKeysMap: RouteState['openKeysMap'] = {};
  const breadcrumbsMap: RouteState['breadcrumbsMap'] = {};
  const flatMenus = (
    convertedMenus: RouteState['pathsMap'] = {},
    menu: IRoute,
    level: number = 1,
    parentKey: null | string = null,
  ) => {
    const displayPath = menu.externalPath || menu.redirect || menu.path;

    if (displayPath) {
      const key = menu.key || menu.externalPath || menu.path;
      if (!key) {
        return;
      }
      menu.displayPath = displayPath;
      menu.parentKey = parentKey;
      menu.level = level;
      menu.keeperKey = menu.keepAlive?.name || displayPath;
      if (parentKey) {
        if (openKeysMap[key]) {
          if (!openKeysMap[key].includes(parentKey)) {
            openKeysMap[key].push(parentKey);
            if (openKeysMap[parentKey].length === openKeysMap[key].length) {
              openKeysMap[key] = [...openKeysMap[parentKey], parentKey];
            }
          }
        } else {
          if (openKeysMap[parentKey]) {
            if (key)
              // 一定会有重复的
              openKeysMap[key] = [...openKeysMap[parentKey], parentKey];
          } else {
            openKeysMap[key] = [parentKey];
          }
        }
      }

      if (breadcrumbsMap[key]) {
        if (breadcrumbsMap[key].length >= level - 1) {
          breadcrumbsMap[key].push(menu as LayoutRoute);
        } else {
          breadcrumbsMap[key] = [
            ...breadcrumbsMap[parentKey!],
            menu as LayoutRoute,
          ];
        }
      } else {
        if (parentKey) {
          const breadcrumbs =
            breadcrumbsMap[parentKey].length >= level
              ? breadcrumbsMap[parentKey].slice(0, -1)
              : breadcrumbsMap[parentKey];

          breadcrumbsMap[key] = [...breadcrumbs, menu as LayoutRoute];
        } else {
          breadcrumbsMap[key] = [menu as LayoutRoute];
        }
      }

      if (parentKey !== key) {
        convertedMenus[key] = [menu as LayoutRoute];
      } else {
        convertedMenus[key].push(menu as LayoutRoute);
      }
      if (menu.routes && Array.isArray(menu.routes)) {
        menu.routes.forEach(route => {
          flatMenus(convertedMenus, route, level + 1, key);
        });
      }
    }
  };

  const pathsMap = menus.reduce((pre, menu) => {
    flatMenus(pre, menu);
    return pre;
  }, {} as LayoutRoute);
  // 去重
  Object.keys(openKeysMap).forEach(key => {
    openKeysMap[key] = [...new Set(openKeysMap[key])];
  });
  // breadcrumbsMap 已经去过重了

  return {
    pathsMap,
    openKeysMap,
    breadcrumbsMap,
  };
};

export default getRouteState;
