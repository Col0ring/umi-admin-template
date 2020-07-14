import React, { useEffect, createContext } from 'react';
import { Layout } from 'antd';
import { connect, useSelector, ConnectRC, useLocation, history } from 'umi';
import { useFullscreen } from '@umijs/hooks';
import SiderBar from './components/SiderBar';
import MainContent from './components/MainContent';
import NavBar from './components/NavBar';
export const Context = createContext<AnyObject>({});
const AccessLayout: ConnectRC = props => {
  const { pathname, search } = useLocation();
  const { ref, toggleFull } = useFullscreen<HTMLDivElement>();

  const {
    dispatch,
    route: { routes },
    children,
  } = props;
  const { convertedMenus } = useSelector(({ app }) => ({
    convertedMenus: app.convertedMenus,
    title: app.title,
  }));

  useEffect(() => {
    history.replace(pathname + search);

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
      <div ref={ref}>
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
