import React, { memo, useEffect } from 'react';
import { useImmer } from 'use-immer';
import { Menu, Layout } from 'antd';
import { MenuProps } from 'antd/es/menu';
import * as Icons from '@ant-design/icons';
import { Link, useSelector, useDispatch, useLocation } from 'umi';
import { OriginMenuItem } from '@/interfaces/app';
import useSiderBarShow from '@/hooks/useSiderBarShow';
import styles from './SiderBar.less';

const { SubMenu, Item } = Menu;
const { Sider } = Layout;
interface SiderBarProps {
  menus: OriginMenuItem[];
}

const renderMenu = (menu: OriginMenuItem): React.ReactNode => {
  const displayPath = menu.redirect || menu.path;
  if (displayPath && menu.name) {
    const key = menu.key || menu.path;
    if (!key) {
      return null;
    }
    if (menu.routes && menu.routes.length > 0) {
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
        <Link to={displayPath}>
          {typeof menu.icon === 'string' &&
            React.createElement((Icons as AnyObject)[menu.icon])}
          <span>{menu.name}</span>
        </Link>
      </Item>
    );
  } else {
    return null;
  }
};

const renderMenus = (menus: OriginMenuItem[]) => {
  return menus.map(menu => {
    return renderMenu(menu);
  });
};

const SiderBar: React.FC<SiderBarProps> = ({ menus }) => {
  const isSiderBarShow = useSiderBarShow();
  const { pathname } = useLocation();
  const [state, setState] = useImmer({
    defaultCollapse: !isSiderBarShow,
    openKeys: [] as string[],
  });
  const {
    selectedKeys,
    savedOpenKeys,
    collapsed,
  }: {
    selectedKeys: string[];
    savedOpenKeys: string[];
    collapsed: boolean;
  } = useSelector(({ app }) => ({
    selectedKeys: app.selectedKeys,
    savedOpenKeys: app.openKeys,
    collapsed: app.collapsed,
  }));

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
    setState(state => {
      state.openKeys = keys as string[];
    });
  };

  useEffect(() => {
    setState(state => {
      state.defaultCollapse = true;
    });
  }, []);

  useEffect(() => {
    setState(state => {
      if (isSiderBarShow && collapsed) {
        state.openKeys = [];
      } else {
        const openKeys = [...new Set([...state.openKeys, ...savedOpenKeys])];
        state.openKeys = openKeys;
      }
    });
  }, [savedOpenKeys, collapsed]);

  useEffect(() => {
    if (!isSiderBarShow) {
      dispatch({
        type: 'app/toggleCollapse',
        payload: true,
      });
    }
  }, [pathname]);

  return (
    <Sider
      className={styles.siderbar}
      trigger={null}
      collapsedWidth={isSiderBarShow ? 80 : 0}
      collapsible
      breakpoint="md"
      collapsed={collapsed}
      onBreakpoint={toggleCollapse}
    >
      <div className={styles.logo} />
      <Menu
        mode="inline"
        selectedKeys={selectedKeys}
        openKeys={state.openKeys}
        theme="dark"
        onOpenChange={onOpenChange}
      >
        {renderMenus(menus)}
      </Menu>
    </Sider>
  );
};

export default memo(SiderBar);
