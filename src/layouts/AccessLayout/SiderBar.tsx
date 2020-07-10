import React, { memo, useEffect } from 'react';
import { Menu } from 'antd';
import { useImmer } from 'use-immer';
import * as Icons from '@ant-design/icons';
import { Link, useLocation, useSelector, useDispatch } from 'umi';
import { OriginMenuItem, ConvertedMenus, OpenKeysMap } from '@/interfaces/app';

const { SubMenu, Item } = Menu;

interface IProps {
  menus: OriginMenuItem[];
}

const renderMenu = (menu: OriginMenuItem): React.ReactNode => {
  if (menu.path && menu.name) {
    if (menu.routes && menu.routes.length > 0) {
      const Icon =
        typeof menu.icon === 'string' &&
        React.createElement((Icons as AnyObject)[menu.icon]);
      return (
        <SubMenu key={menu.key || menu.path} icon={Icon} title={menu.name}>
          {renderMenus(menu.routes)}
        </SubMenu>
      );
    }

    return (
      <Item key={menu.key || menu.path}>
        <Link to={menu.path}>
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

const SiderBar: React.FC<IProps> = ({ menus }) => {
  const {
    selectedKeys,
    openKeys,
  }: {
    selectedKeys: string[];
    openKeys: string[];
  } = useSelector(({ app }) => ({
    selectedKeys: app.selectedKeys,
    openKeys: app.openKeys,
  }));
  const dispatch = useDispatch();

  const onOpenChange = (keys: string[]) => {
    dispatch({
      type: 'app/setOpenKeys',
      payload: keys,
    });
  };

  return (
    <Menu
      mode="inline"
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      theme="dark"
      onOpenChange={onOpenChange}
    >
      {renderMenus(menus)}
    </Menu>
  );
};

export default memo(SiderBar);
