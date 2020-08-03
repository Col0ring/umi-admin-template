import React, { useEffect, createContext, useRef } from 'react';
import { Layout } from 'antd';
import { connect, useSelector, ConnectRC, useLocation, Helmet } from 'umi';
import { useFullscreen } from 'ahooks';
import SiderBar from './components/SiderBar';
import MainContent from './components/MainContent';
import NavBar from './components/NavBar';
import GlobalFooter from '@/components/GlobalFooter';
import setting from '@/setting';
import useSiderBarShow from '@/hooks/useSiderBarShow';
export const Context = createContext<AnyObject>({});
const AccessLayout: ConnectRC = props => {
  const { pathname, search } = useLocation();
  const fullRef = useRef<HTMLDivElement | null>(null);
  const [, { toggleFull }] = useFullscreen(fullRef.current);

  const {
    dispatch,
    route: { routes },
    children,
  } = props;
  const { convertedMenus, title, collapsed } = useSelector(({ app }) => ({
    convertedMenus: app.convertedMenus,
    title: app.title,
    collapsed: app.collapsed,
  }));
  const isSiderBarShow = useSiderBarShow();

  useEffect(() => {
    dispatch({
      type: 'app/setLayoutData',
      payload: routes,
    });
  }, []);

  useEffect(() => {
    if (Object.keys(convertedMenus).length !== 0) {
      dispatch({
        type: 'app/setCurrentLayoutData',
        payload: pathname + search,
      });
    }
  }, [pathname, search, convertedMenus]);

  return (
    <Context.Provider value={{ toggleFull }}>
      {/* 修改标题 */}
      <Helmet>
        <title>{setting.menuTitle + `-${title}`}</title>
      </Helmet>

      <div ref={fullRef}>
        <Layout
          style={{
            minHeight: '100vh',
            paddingLeft: isSiderBarShow ? (collapsed ? 80 : 200) : 0,
            transition: 'all 0.2s',
          }}
        >
          <SiderBar menus={routes || []} />
          <Layout>
            <NavBar />
            <MainContent>{children}</MainContent>
            <GlobalFooter />
          </Layout>
        </Layout>
      </div>
    </Context.Provider>
  );
};

export default connect()(AccessLayout);
