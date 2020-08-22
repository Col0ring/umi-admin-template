import { IRoute } from 'umi';
export type LayoutRoute = IRoute & {
  parentKey: string | null;
  level: number;
  name: string;
  displayPath: string;
  keeperKey: string;
};

export interface LayoutState {
  selectedKey: string;
  // 选中的tab
  tabKey: string;
  openKeys: string[];
  breadcrumbs: LayoutRoute[];
  tabPanes: LayoutRoute[];
}

export interface RouteState {
  pathsMap: AnyObject<LayoutRoute[]>;
  breadcrumbsMap: AnyObject<LayoutRoute[]>;
  openKeysMap: AnyObject<string[]>;
}
