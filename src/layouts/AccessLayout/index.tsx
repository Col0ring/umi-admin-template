import React, { useEffect } from 'react';
import { Layout } from 'antd';
import { connect, useSelector, ConnectRC, useLocation, history } from 'umi';
import SiderBar from './components/SiderBar';
import MainContent from './components/MainContent';
import NavBar from './components/NavBar';

const AccessLayout: ConnectRC = props => {
  const { pathname, search } = useLocation();
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
    <Layout style={{ minHeight: '100vh' }}>
      <SiderBar menus={routes || []} />
      <Layout>
        <NavBar />
        <MainContent>{children}</MainContent>
      </Layout>
    </Layout>
  );
};

export default connect()(AccessLayout);
