import React from 'react';
import { Menu } from 'antd';
import { useDispatch } from 'umi';

export interface HeaderDropdownProps {}

const HeaderDropdown: React.FC<HeaderDropdownProps> = () => {
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch({
      type: 'permission/resetUser',
    });
  };
  return (
    <Menu>
      <Menu.Item onClick={onLogout}>退出登陆</Menu.Item>
      <Menu.Item>修改密码</Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          href="https://github.com/Col0ring/umi-admin-template"
        >
          Github
        </a>
      </Menu.Item>
    </Menu>
  );
};

export default HeaderDropdown;
