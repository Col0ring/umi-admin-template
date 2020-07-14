import React, { useContext } from 'react';
import { useImmer } from 'use-immer';
import { Avatar, Dropdown, Badge, Space } from 'antd';
import {
  DownOutlined,
  BellOutlined,
  FullscreenOutlined,
} from '@ant-design/icons';
import HeaderDropdown from '../HeaderDropdown';
import classnames from 'classnames';
import styles from './index.less';
import { Context as LayoutContext } from '@/layouts/AccessLayout';

const GlobalHeader: React.FC = () => {
  const [state, setState] = useImmer({
    visible: false,
  });
  const { toggleFull } = useContext(LayoutContext);
  const onVisibleChange = (visible: boolean) => {
    setState(state => {
      state.visible = visible;
    });
  };

  const iconClassname = classnames(styles.icon, {
    [styles.open]: state.visible,
  });
  return (
    <div className={styles.globalHeaderContainer}>
      <div className={styles.tools}>
        <Space>
          <Badge dot>
            <BellOutlined />
          </Badge>
          <FullscreenOutlined onClick={toggleFull} />
        </Space>
      </div>
      <Dropdown
        arrow
        overlay={<HeaderDropdown />}
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

export default GlobalHeader;
