import { IRoute } from 'umi';
import {
  ConvertedMenus,
  MenuItem,
  OpenKeysMap,
  breadcrumbsMap,
} from '@/interfaces/app';

export interface LayoutData {
  convertedMenus: ConvertedMenus;
  openKeysMap: OpenKeysMap;
  breadcrumbsMap: breadcrumbsMap;
}

export const getLayoutData = (menus: IRoute[]): LayoutData => {
  menus = JSON.parse(JSON.stringify(menus));
  const openKeysMap: OpenKeysMap = {};
  const breadcrumbsMap: breadcrumbsMap = {};
  const flatMenus = (
    convertedMenus: ConvertedMenus = {},
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
          breadcrumbsMap[key].push(menu as MenuItem);
        } else {
          breadcrumbsMap[key] = [
            ...breadcrumbsMap[parentKey!],
            menu as MenuItem,
          ];
        }
      } else {
        if (parentKey) {
          const breadcrumbs =
            breadcrumbsMap[parentKey].length >= level
              ? breadcrumbsMap[parentKey].slice(0, -1)
              : breadcrumbsMap[parentKey];

          breadcrumbsMap[key] = [...breadcrumbs, menu as MenuItem];
        } else {
          breadcrumbsMap[key] = [menu as MenuItem];
        }
      }

      if (parentKey !== key) {
        convertedMenus[key] = [menu as MenuItem];
      } else {
        convertedMenus[key].push(menu as MenuItem);
      }
      if (menu.routes && Array.isArray(menu.routes)) {
        menu.routes.forEach(route => {
          flatMenus(convertedMenus, route, level + 1, key);
        });
      }
    }
  };

  const convertedMenus = menus.reduce((pre, menu) => {
    flatMenus(pre, menu);
    return pre;
  }, {} as ConvertedMenus);
  // 去重
  Object.keys(openKeysMap).forEach(key => {
    openKeysMap[key] = [...new Set(openKeysMap[key])];
  });
  // breadcrumbsMap 已经去过重了

  return {
    convertedMenus,
    openKeysMap,
    breadcrumbsMap,
  };
};
