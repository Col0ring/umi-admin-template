import React, { useEffect, useState, useCallback } from 'react';
import { IRouteComponentProps, IRoute, useLocation } from 'umi';
import LayoutContext from './contexts/LayoutContext';
import { RouteState, LayoutState } from '@/interfaces/layouts';
import getRouteState from './utils/getRouteState';
import getLayoutState from './utils/getLayoutState';

const AccessLayoutProvider: React.FC<IRouteComponentProps & {
  routes: IRoute[];
}> = ({ children, routes }) => {
  const { pathname, search } = useLocation();
  const path = pathname + search;

  const [routesState, setRouteState] = useState<RouteState>({
    pathsMap: {},
    breadcrumbsMap: {},
    openKeysMap: {},
  });

  const [layoutState, setLayoutState] = useState<LayoutState>({
    selectedKey: '',
    breadcrumbs: [],
    tabPanes: [],
    openKeys: [],
    tabKey: '',
  });

  const setTabPanes = useCallback(
    (tabPanes: LayoutState['tabPanes']) => {
      setLayoutState({
        ...layoutState,
        tabPanes,
      });
    },
    [layoutState, setLayoutState],
  );

  // 设置路由映射
  useEffect(() => {
    const newRouteState = getRouteState(routes);
    setRouteState(newRouteState);
  }, [routes]);

  // 通过路由映射获取当前路径相关信息
  useEffect(() => {
    const newLayoutState = getLayoutState(routesState, layoutState, path);
    if (newLayoutState) {
      setLayoutState(newLayoutState);
    }
  }, [path, routesState]);
  return (
    <LayoutContext.Provider value={{ layoutState, setTabPanes }}>
      {children}
    </LayoutContext.Provider>
  );
};

export default AccessLayoutProvider;
