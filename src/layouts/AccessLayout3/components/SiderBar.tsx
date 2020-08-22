import React, { memo, useEffect, useCallback } from 'react';
import classnames from 'classnames';
import { useImmer } from 'use-immer';
import { Menu, Layout, Drawer } from 'antd';
import { MenuProps } from 'antd/es/menu';
import * as Icons from '@ant-design/icons';
import { Link, useSelector, useDispatch, useLocation, IRoute } from 'umi';
import useMobile from '@/hooks/useMobile';
import useLayout from '@/hooks/useLayout';
import Logo from './Logo';
import { matchRoles } from '@/utils/route';
import { urlReg } from '@/utils/validators';
import styles from './SiderBar.less';
import setting from '@/setting';
import useAuth from '@/hooks/useAuth';

const { SubMenu, Item } = Menu;
const { Sider } = Layout;
interface SiderBarProps {
  menus: IRoute[];
}

const SiderBar: React.FC<SiderBarProps> = ({ menus }) => {
  const isMobile = useMobile();
  const { pathname } = useLocation();
  const { roles } = useAuth();
  const { selectedKey, openKeys: savedOpenKeys } = useLayout();
  const { collapsed } = useSelector(({ app }) => ({
    collapsed: app.collapsed,
  }));

  const renderMenu = useCallback(
    (menu: IRoute): React.ReactNode => {
      const displayPath = menu.externalPath || menu.redirect || menu.path;
      if (
        matchRoles(roles, menu.roles) &&
        !menu.hideInMenu &&
        menu.name &&
        displayPath
      ) {
        const key = menu.key || menu.externalPath || menu.path;
        if (!key) {
          return null;
        }
        if (!menu.hideChildrenInMenu && menu.routes && menu.routes.length > 0) {
          const Icon =
            typeof menu.icon === 'string' &&
            React.createElement((Icons as AnyObject)[menu.icon]);
          return (
            <SubMenu key={key} icon={Icon} title={menu.name}>
              {renderMenus(menu.routes)}
            </SubMenu>
          );
        }

        return (
          <Item key={key}>
            {urlReg.test(displayPath) ? (
              <a href={displayPath} target="_blank" rel="noopener">
                {typeof menu.icon === 'string' &&
                  React.createElement((Icons as AnyObject)[menu.icon])}
                <span>{menu.name}</span>
              </a>
            ) : (
              <Link to={displayPath}>
                {typeof menu.icon === 'string' &&
                  React.createElement((Icons as AnyObject)[menu.icon])}
                <span>{menu.name}</span>
              </Link>
            )}
          </Item>
        );
      } else {
        return null;
      }
    },
    [roles],
  );

  const renderMenus = useCallback(
    (menus: IRoute[]) => {
      return menus.map(menu => {
        return renderMenu(menu);
      });
    },
    [renderMenu],
  );

  const [state, setState] = useImmer({
    defaultCollapse: !isMobile,
    openKeys: [] as string[],
    collapsedOpenKeys: [] as string[],
  });

  const dispatch = useDispatch();
  const toggleCollapse = (broken: boolean) => {
    if (state.defaultCollapse) {
      dispatch({
        type: 'app/toggleCollapse',
        payload: broken,
      });
    }
  };

  const onOpenChange: MenuProps['onOpenChange'] = keys => {
    //  在collapse关闭的时候会变为空数组
    if (collapsed) {
      setState(state => {
        state.collapsedOpenKeys = keys as string[];
      });
    } else {
      setState(state => {
        state.openKeys = keys as string[];
      });
    }
  };

  const onDrawerClose = () => {
    dispatch({
      type: 'app/toggleCollapse',
      payload: !collapsed,
    });
  };

  useEffect(() => {
    setState(state => {
      state.defaultCollapse = true;
    });
  }, []);

  useEffect(() => {
    setState(state => {
      const openKeys = [...new Set([...state.openKeys, ...savedOpenKeys])];
      state.openKeys = openKeys;
    });
  }, [savedOpenKeys]);

  useEffect(() => {
    if (!isMobile) {
      dispatch({
        type: 'app/toggleCollapse',
        payload: true,
      });
    }
  }, [pathname]);

  const siderbarClassName = classnames(styles.siderbar, {
    [styles.fixed]: isMobile,
  });

  return React.createElement(
    isMobile ? React.Fragment : Drawer,
    isMobile
      ? null
      : {
          bodyStyle: { padding: 0 },
          width: 200,
          closable: false,
          placement: 'left',
          visible: !collapsed,
          onClose: onDrawerClose,
        },
    <Sider
      className={siderbarClassName}
      trigger={null}
      collapsedWidth={isMobile ? 80 : 0}
      collapsible
      breakpoint="md"
      collapsed={isMobile ? collapsed : false}
      onBreakpoint={isMobile ? toggleCollapse : undefined}
    >
      <Logo className={styles.logo} title={setting.menuTitle} />
      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        openKeys={collapsed ? state.collapsedOpenKeys : state.openKeys}
        theme="dark"
        onOpenChange={onOpenChange}
      >
        {renderMenus(menus)}
      </Menu>
    </Sider>,
  );
};

export default memo(SiderBar);
