import React, { memo, useEffect } from 'react';
import { useImmer } from 'use-immer';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { useLocation } from 'umi';
import { Layout, Affix } from 'antd';
import { Scrollbar } from 'react-scrollbars-custom';
import setting from '@/layouts/AccessLayout/setting';
import styles from './index.less';
import useMobile from '@/hooks/useMobile';
import Breadcrumb from './Breadcrumb';
import TabPane from './TabPane';
import Userinfo from './Userinfo';
import useAccessLayout from '../../hooks/useAccessLayout';
import useLayout from '../../hooks/useLayout';
import useAuth from '@/hooks/useAuth';
const { Header } = Layout;

const NavBar: React.FC = () => {
  const { collapsed, setCollapsed } = useAccessLayout();
  const { breadcrumbs, tabPanes, tabKey, setTabPanes } = useLayout();
  const { isMathRoles } = useAuth();
  const [state, setState] = useImmer({
    tabPanes: [] as typeof tabPanes,
  });

  const { pathname, search } = useLocation();
  const path = pathname + search;
  const isMobile = useMobile();
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };
  useEffect(() => {
    if (isMathRoles) {
      setState(state => {
        state.tabPanes = tabPanes;
      });
    } else {
      setTabPanes(state.tabPanes);
    }
  }, [tabPanes, isMathRoles, setState]);
  return React.createElement(
    setting.navbarFixed || !isMobile ? Affix : 'div',
    null,
    <div>
      <Header className={styles.navbar}>
        <div className={styles.content}>
          <div className={styles.collapse}>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: styles.trigger,
                onClick: toggleCollapse,
              },
            )}
          </div>
          <div className={styles.breadcrumbContainer}>
            <Scrollbar
              className={styles.breadcrumbscrollWrapper}
              noScrollY
              removeTracksWhenNotUsed={true}
              contentProps={{
                style: {
                  height: '100%',
                },
              }}
            >
              <div className={styles.breadcrumb}>
                <Breadcrumb
                  pathname={pathname}
                  breadcrumbs={isMathRoles ? breadcrumbs : []}
                />
              </div>
            </Scrollbar>
          </div>
          <div className={styles.avatarContainer}>
            <Userinfo />
          </div>
        </div>
      </Header>
      {setting.tabsShow && (
        <TabPane tabPanes={state.tabPanes} tabKey={tabKey} path={path} />
      )}
    </div>,
  );
};
export default memo(NavBar);
