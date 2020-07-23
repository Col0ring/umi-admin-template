import React, { useEffect, createContext, useRef } from 'react';
import { Layout } from 'antd';
import { connect, useSelector, ConnectRC, useLocation } from 'umi';
import { useFullscreen } from 'ahooks';
import SiderBar from './components/SiderBar';
import MainContent from './components/MainContent';
import NavBar from './components/NavBar';
import setting from '@/setting';
export const Context = createContext<AnyObject>({});
const AccessLayout: ConnectRC = props => {
  const { pathname } = useLocation();
  const fullRef = useRef<HTMLDivElement | null>(null);
  const [, { toggleFull }] = useFullscreen(
    fullRef as React.MutableRefObject<HTMLDivElement>,
  );

  const {
    dispatch,
    route: { routes },
    children,
  } = props;
  const { convertedMenus, title } = useSelector(({ app }) => ({
    convertedMenus: app.convertedMenus,
    title: app.title,
  }));

  // 设置标题
  useEffect(() => {
    setTimeout(() => {
      document.title = setting.menuTitle + `-${title}`;
    });
  }, [title]);

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
        payload: pathname,
      });
    }
  }, [pathname, convertedMenus]);

  return (
    <Context.Provider value={{ toggleFull }}>
      <div ref={fullRef}>
        <Layout style={{ minHeight: '100vh' }}>
          <SiderBar menus={routes || []} />
          <Layout>
            <NavBar />
            <MainContent>{children}</MainContent>
          </Layout>
        </Layout>
      </div>
    </Context.Provider>
  );
};

export default connect()(AccessLayout);
