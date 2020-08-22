import React, { useContext, memo } from 'react';
import { useDispatch } from 'umi';
import { useImmer } from 'use-immer';
import { Avatar, Dropdown, Badge, Space, Menu } from 'antd';
import {
  DownOutlined,
  BellOutlined,
  FullscreenOutlined,
  EditOutlined,
  GithubOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import classnames from 'classnames';
import AccessLayoutContext from '../../../contexts/AccessLayoutContext';
import styles from './index.less';

interface UserinfoDropdownProps {
  onLogout: () => void;
}

const UserinfoDropdown: React.FC<UserinfoDropdownProps> = ({ onLogout }) => {
  return (
    <Menu selectable={false}>
      <Menu.Item icon={<EditOutlined />}>修改密码</Menu.Item>
      <Menu.Item icon={<GithubOutlined />}>
        <a
          target="_blank"
          rel="noopener"
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

const Userinfo: React.FC = () => {
  const [state, setState] = useImmer({
    dropDownVisible: false,
  });
  const { toggleFull } = useContext(AccessLayoutContext);

  const onVisibleChange = (visible: boolean) => {
    setState(state => {
      state.dropDownVisible = visible;
    });
  };

  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch({
      type: 'permission/resetUser',
    });
  };

  const iconClassname = classnames(styles.icon, {
    [styles.open]: state.dropDownVisible,
  });
  return (
    <div className={styles.globalHeaderContainer}>
      <div className={styles.tools}>
        <Space size="middle">
          <Badge dot>
            <BellOutlined />
          </Badge>
          <FullscreenOutlined onClick={toggleFull} />
        </Space>
      </div>
      <Dropdown
        visible={state.dropDownVisible}
        arrow
        overlay={<UserinfoDropdown onLogout={onLogout} />}
        onVisibleChange={onVisibleChange}
      >
        <div className={styles.avatarContainer}>
          <Avatar
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            size="large"
            alt="头像"
          />
          <DownOutlined className={iconClassname} />
        </div>
      </Dropdown>
    </div>
  );
};

export default memo(Userinfo);
