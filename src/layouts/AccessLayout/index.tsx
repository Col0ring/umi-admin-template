import React, { createContext, useRef } from 'react';
import { Layout } from 'antd';
import { useSelector, Helmet, IRouteComponentProps, IRoute } from 'umi';
import { useFullscreen } from 'ahooks';
import SiderBar from './components/SiderBar';
import MainContent from './components/MainContent';
import NavBar from './components/NavBar';
import GlobalFooter from '@/components/GlobalFooter';
import setting from '@/setting';
import useMobile from '@/hooks/useMobile';
import useLayout from '@/hooks/useLayout';
import { matchRoles } from '@/utils/route';
import ForbiddenPage from './components/ForbiddenPage';
import useAuth from '@/hooks/useAuth';

export const Context = createContext<AnyObject>({});

const AccessLayout: React.FC<IRouteComponentProps> = props => {
  const fullRef = useRef<HTMLDivElement | null>(null);
  const [, { toggleFull }] = useFullscreen(fullRef.current);
  const { roles } = useAuth();
  const {
    route: { routes },
    children,
  } = props;
  const { title, collapsed } = useSelector(({ app }) => ({
    title: app.title,
    collapsed: app.collapsed,
  }));
  const isMobile = useMobile();
  const { breadcrumbs } = useLayout();
  const currentRoute = breadcrumbs[breadcrumbs.length - 1];

  return (
    <Context.Provider value={{ toggleFull }}>
      {/* 修改标题 */}
      <Helmet>
        <title>{setting.menuTitle + (title ? `-${title}` : '')}</title>
      </Helmet>

      <div className="umi-admin-layout" ref={fullRef}>
        <Layout
          style={{
            minHeight: '100vh',
            paddingLeft: isMobile ? (collapsed ? 80 : 200) : 0,
            transition: 'all 0.2s',
          }}
        >
          <SiderBar menus={(routes as IRoute[]) || []} />
          <Layout>
            <NavBar />
            <MainContent>
              {matchRoles(roles, currentRoute?.roles) ? (
                children
              ) : (
                <ForbiddenPage />
              )}
            </MainContent>
            <GlobalFooter />
          </Layout>
        </Layout>
      </div>
    </Context.Provider>
  );
};

export default AccessLayout;
