import { IRoute } from 'umi';

export type MenuItem = IRoute & {
  parentKey: string | null;
  level: number;
  name: string;
  displayPath: string;
  keeperKey: string;
};

export type ConvertedMenus = AnyObject<MenuItem[]>;
export type OpenKeysMap = AnyObject<string[]>;
export type breadcrumbsMap = AnyObject<MenuItem[]>;

export interface LayoutState {
  convertedMenus: ConvertedMenus;
  openKeysMap: OpenKeysMap;
  breadcrumbsMao: breadcrumbsMap;
}
