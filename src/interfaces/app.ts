import { IRoute } from 'umi';
export interface OriginMenuItem extends IRoute {
  routes?: OriginMenuItem[];
  hideChildrenInMenu?: boolean;
  hideInMenu?: boolean;
  breadcrumbName?: string;
  icon?: React.ReactNode;
  name?: string;
  path?: string;
  key?: string;
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
