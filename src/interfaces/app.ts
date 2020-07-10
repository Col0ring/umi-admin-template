import { IRoute } from 'umi';
import { PathRegExp } from 'path-to-regexp';
export interface OriginMenuItem extends IRoute {
  routes?: OriginMenuItem[];
  hideChildrenInMenu?: boolean;
  hideInMenu?: boolean;
  icon?: React.ReactNode;
  name?: string;
  path?: string;
  key?: string;
}

export type MenuItem = OriginMenuItem & {
  parentKey: string | null;
  level: number;
  name: string;
  path: string;
  pattern: PathRegExp;
};

export type ConvertedMenus = AnyObject<MenuItem[]>;
export type OpenKeysMap = AnyObject<string[]>;
export type BreadCrumbsMap = AnyObject<MenuItem[]>;
