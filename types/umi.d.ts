export { IRouteProps, IRoute } from 'umi';
interface MergeRoute {
  hideChildrenInMenu?: boolean;
  hideInMenu?: boolean;
  hideInBreadcrumb?: boolean;
  hideInTabs?: boolean;
  activeMenu?: string;
  icon?: string;
  name?: string;

  breadcrumbName?: string;
  breadcrumbPath?: string;

  tabName?: string;
  tabPath?: string;

  path?: string;
  key?: string;
  externalPath?: string;
  redirect?: string;

  keepAlive?: AnyObject;
  roles?: string[];
  authLayout?: boolean;
  // routes 在下面都有而且需要单独对各自递归，所以不再这写
}
declare module 'umi' {
  export interface IRouteProps extends MergeRoute {}
  export interface IRoute extends MergeRoute {}
}
