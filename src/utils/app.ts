import {
  OriginMenuItem,
  ConvertedMenus,
  MenuItem,
  OpenKeysMap,
  BreadCrumbsMap,
} from '@/interfaces/app';
// import pathToRegexp from 'path-to-regexp';

// export const getConvertedMenus = (menus: OriginMenuItem[]): ConvertedMenus => {
//   menus = JSON.parse(JSON.stringify(menus));
//   const flatMenus = (
//     convertedMenus: ConvertedMenus = {},
//     menu: OriginMenuItem,
//     level: number = 1,
//     parentKey: null | string = null,
//   ) => {
//     if (menu.name && menu.path) {
//       const key = menu.key || menu.path;
//       menu.parentKey = parentKey;
//       menu.level = level;
//       if (parentKey !== key) {
//         convertedMenus[key] = [menu as MenuItem];
//       } else {
//         convertedMenus[key].push(menu as MenuItem);
//       }
//       if (menu.routes && Array.isArray(menu.routes)) {
//         menu.routes.forEach(route => {
//           flatMenus(convertedMenus, route, level + 1, key);
//         });
//       }
//     }
//   };
//   return menus.reduce((pre, menu) => {
//     flatMenus(pre, menu);
//     return pre;
//   }, {} as ConvertedMenus);
// };

export interface LayoutData {
  convertedMenus: ConvertedMenus;
  openKeysMap: OpenKeysMap;
  breadCrumbsMap: BreadCrumbsMap;
}

export const getLayoutData = (menus: OriginMenuItem[]): LayoutData => {
  menus = JSON.parse(JSON.stringify(menus));
  const openKeysMap: OpenKeysMap = {};
  const breadCrumbsMap: BreadCrumbsMap = {};
  const flatMenus = (
    convertedMenus: ConvertedMenus = {},
    menu: OriginMenuItem,
    level: number = 1,
    parentKey: null | string = null,
  ) => {
    const displayPath = menu.redirect || menu.path;
    if (menu.name && displayPath) {
      const key = menu.key || menu.path;
      if (!key) {
        return;
      }
      menu.parentKey = parentKey;
      menu.level = level;
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

      if (breadCrumbsMap[key]) {
        if (breadCrumbsMap[key].length >= level - 1) {
          breadCrumbsMap[key].push(menu as MenuItem);
        } else {
          breadCrumbsMap[key] = [
            ...breadCrumbsMap[parentKey!],
            menu as MenuItem,
          ];
        }
      } else {
        if (parentKey) {
          const breadCrumbs =
            breadCrumbsMap[parentKey].length >= level
              ? breadCrumbsMap[parentKey].slice(0, -1)
              : breadCrumbsMap[parentKey];

          breadCrumbsMap[key] = [...breadCrumbs, menu as MenuItem];
        } else {
          breadCrumbsMap[key] = [menu as MenuItem];
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
  // breadCrumbsMap 已经去过重了

  return {
    convertedMenus,
    openKeysMap,
    breadCrumbsMap,
  };
};

// export const getOpenKeys = (path: string, convertedMenus: ConvertedMenus) => {
//   const openKeys: string[] = [];
//   const currentMenus = convertedMenus[path];
//   if (currentMenus) {
//     let current: MenuItem | null = currentMenus[currentMenus.length - 1];
//     let level = current.level;
//     current.parentKey && openKeys.push(current.parentKey);
//     while (current && current.parentKey) {
//       const parentMenus = convertedMenus[current.parentKey];
//       current = null;
//       parentMenus.some(menu => {
//         if (menu.level === level - 1) {
//           menu.parentKey && openKeys.push(menu.parentKey);
//           level -= 1;
//           current = menu;
//         }
//       });
//     }
//   }
//   return openKeys;
// };

// export const getBreadCrumbs = (
//   path: string,
//   convertedMenus: ConvertedMenus,
// ) => {
//   const breadCrumbs: MenuItem[] = [];
//   const currentMenus = convertedMenus[path];
//   if (currentMenus) {
//     let current: MenuItem | null = currentMenus[currentMenus.length - 1];
//     let level = current.level;
//     breadCrumbs.unshift(current);
//     while (current && current.parentKey) {
//       const parentMenus = convertedMenus[current.parentKey];
//       current = null;
//       parentMenus.some(menu => {
//         if (menu.level === level - 1) {
//           breadCrumbs.unshift(menu);
//           level -= 1;
//           current = menu;
//         }
//       });
//     }
//   }
//   return breadCrumbs;
// };
