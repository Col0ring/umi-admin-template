import React, { useEffect } from 'react';
import { useImmer } from 'use-immer';
import { Layout } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { connect, useSelector, ConnectRC, useLocation } from 'umi';
import SiderBar from './SiderBar';
import NavBar from './NavBar';
import Breadcrumbs from './Breadcrumb';
import styles from './index.less';
const { Header, Sider, Content } = Layout;

const AccessLayout: ConnectRC = props => {
  const [state, setState] = useImmer({
    defaultCollapse: false,
  });
  const { pathname } = useLocation();
  const {
    dispatch,
    route: { routes },
    children,
  } = props;
  const { collapsed, convertedMenus } = useSelector(({ app }) => ({
    collapsed: app.collapsed,
    convertedMenus: app.convertedMenus,
  }));

  const toggleCollapse = () => {
    dispatch({
      type: 'app/toggleCollapse',
      payload: !collapsed,
    });
  };
  useEffect(() => {
    // 初始化跳转 bug
    dispatch({
      type: 'app/setLayoutData',
      payload: routes,
    });
    setState(state => {
      state.defaultCollapse = true;
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: 'app/setCurrentLayoutData',
      payload: pathname,
    });
  }, [pathname, convertedMenus]);

  return (
    <Layout className={styles.globalLayout}>
      <Sider
        trigger={null}
        collapsible
        breakpoint="md"
        collapsed={collapsed}
        onCollapse={state.defaultCollapse ? toggleCollapse : undefined}
      >
        <div className={styles.logo} />
        <SiderBar menus={routes || []} />
      </Sider>
      <Layout className={styles.siteLayout}>
        <Header className={styles.siteLayoutHeader} style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: styles.trigger,
              onClick: toggleCollapse,
            },
          )}
          <Breadcrumbs />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default connect()(AccessLayout);
