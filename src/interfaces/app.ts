import { IRoute } from 'umi';
export interface OriginMenuItem extends IRoute {
  routes?: OriginMenuItem[];
  hideChildrenInMenu?: boolean;
  hideInMenu?: boolean;
  hideInBreadcrumb?: boolean;
  hideInTabs?: boolean;
  breadcrumbName?: string;
  tabName?: string;
  icon?: string;
  name?: string;
  path?: string;
  key?: string;
  activePath?: string;
  externalPath?: string;
  redirect?: string;
}

export type MenuItem = OriginMenuItem & {
  parentKey: string | null;
  level: number;
  name: string;
  displayPath: string;
};

export type ConvertedMenus = AnyObject<MenuItem[]>;
export type OpenKeysMap = AnyObject<string[]>;
export type BreadCrumbsMap = AnyObject<MenuItem[]>;
