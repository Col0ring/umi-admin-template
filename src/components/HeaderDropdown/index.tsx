import React from 'react';
import { Menu } from 'antd';
import {
  GithubOutlined,
  EditOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useDispatch } from 'umi';

export interface HeaderDropdownProps {}

const HeaderDropdown: React.FC<HeaderDropdownProps> = () => {
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch({
      type: 'permission/resetUser',
    });
    dispatch({
      type: 'app/setTabPanes',
      payload: [],
    });
  };
  return (
    <Menu>
      <Menu.Item icon={<EditOutlined />}>修改密码</Menu.Item>
      <Menu.Item icon={<GithubOutlined />}>
        <a
          target="_blank"
          href="https://github.com/Col0ring/umi-admin-template"
        >
          Github
        </a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item icon={<LogoutOutlined />} onClick={onLogout}>
        退出登陆
      </Menu.Item>
    </Menu>
  );
};

export default HeaderDropdown;
