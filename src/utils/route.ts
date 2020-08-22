import { IRoute, matchPath } from 'umi';

// 转换原始路由结构路由
export function transformRoutes(routes: IRoute[]) {
  return routes.map(route => {
    if (route.routes && Array.isArray(route.routes)) {
      if (route.roles) {
        route.routes.forEach(item => {
          item.roles = route.roles?.concat(item.roles || []);
        });
      }
      if (route.authLayout) {
        route.routes.forEach(item => {
          if (typeof item.authLayout === 'undefined') {
            item.authLayout = route.authLayout;
          }
        });
      }
      if (!route.breadcrumbPath) {
        route.routes.some(item => {
          if (item.path === route.path || !item.path) {
            if (item.redirect) {
              route.breadcrumbPath = item.redirect;
            }
            return true;
          }
          return false;
        });
      }
      route.routes = transformRoutes(route.routes);
    }
    return route;
  });
}

// 匹配权限
export function matchRoles(roles: string[], routeRoles?: string[]) {
  if (!routeRoles) {
    return true;
  }
  return roles.some(role => routeRoles.includes(role));
}

export function isHomePath(path: string): boolean {
  return !!matchPath(path, { path: '/dashboard', exact: true });
}
