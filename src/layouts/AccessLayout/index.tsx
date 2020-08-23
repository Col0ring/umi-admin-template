import React, { useRef, useCallback } from 'react';
import { useImmer } from 'use-immer';
import { Layout } from 'antd';
import { Helmet, IRouteComponentProps, IRoute } from 'umi';
import { useFullscreen } from 'ahooks';
import SiderBar from './components/SiderBar';
import MainContent from './components/MainContent';
import NavBar from './components/NavBar';
import LayoutFooter from './components/LayoutFooter';
import setting from '@/layouts/AccessLayout/setting';
import useMobile from '@/hooks/useMobile';
import useLayout from '../../hooks/useLayout';
import useAuth from '@/hooks/useAuth';
import ForbiddenPage from '@/components/403';
import AccessLayoutContext from './contexts/AccessLayoutContext';

const AccessLayout: React.FC<IRouteComponentProps> = props => {
  const fullRef = useRef<HTMLDivElement | null>(null);
  const [, { toggleFull }] = useFullscreen(fullRef.current);
  const [state, setState] = useImmer({
    collapsed: false,
  });
  const { collapsed } = state;
  const { isMathRoles } = useAuth();
  const {
    location: { pathname },
    route: { routes },
    children,
  } = props;

  const isMobile = useMobile();
  const { breadcrumbs, openKeys, selectedKey } = useLayout();

  const currentRoute = breadcrumbs[breadcrumbs.length - 1];
  const title = currentRoute?.title || currentRoute?.name;

  const setCollapsed = useCallback(
    (collapsed: boolean) => {
      setState(state => {
        state.collapsed = collapsed;
      });
    },
    [setState],
  );

  return (
    <AccessLayoutContext.Provider
      value={{ toggleFull, collapsed, setCollapsed }}
    >
      {/* 修改标题 */}
      {setting.autoGetTitle && (
        <Helmet>
          <title>{setting.title + (title ? ' - ' + title : '')}</title>
        </Helmet>
      )}

      <div className="umi-admin-layout" ref={fullRef}>
        <Layout
          style={{
            minHeight: '100vh',
            paddingLeft: isMobile ? (collapsed ? 80 : 200) : 0,
            transition: 'all 0.2s',
          }}
        >
          <SiderBar
            pathname={pathname}
            selectedKey={selectedKey}
            openKeys={openKeys}
            menus={(routes as IRoute[]) || []}
          />
          <Layout>
            <NavBar />
            <MainContent>
              {isMathRoles ? children : <ForbiddenPage />}
            </MainContent>
            <LayoutFooter />
          </Layout>
        </Layout>
      </div>
    </AccessLayoutContext.Provider>
  );
};

export default AccessLayout;
