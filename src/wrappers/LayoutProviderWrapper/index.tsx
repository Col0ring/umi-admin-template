import React, { useEffect, useState } from 'react';
import { IRouteComponentProps, IRoute, useLocation } from 'umi';
import LayoutContext from './context/LayoutContext';
import { RouteState, LayoutState } from './types';
import getRouteState from './utils/getRouteState';
import getLayoutState from './utils/getLayoutState';

const LayoutProviderWrapper: React.FC<IRouteComponentProps & {
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
  useEffect(() => {
    const newRouteState = getRouteState(routes);
    setRouteState(newRouteState);
  }, [routes]);
  useEffect(() => {
    const newLayoutState = getLayoutState(routesState, layoutState, path);
    if (newLayoutState) {
      setLayoutState(newLayoutState);
    }
  }, [path, routesState]);
  return (
    <LayoutContext.Provider value={layoutState}>
      {children}
    </LayoutContext.Provider>
  );
};

export default LayoutProviderWrapper;
export { LayoutContext };
