import React from 'react';
import { useImmer } from 'use-immer';
import { Avatar, Dropdown, Badge } from 'antd';
import { DownOutlined, BellOutlined } from '@ant-design/icons';
import HeaderDropdown from '../HeaderDropdown';
import classnames from 'classnames';
import styles from './index.less';

const GlobalHeader: React.FC = () => {
  const [state, setState] = useImmer({
    visible: false,
  });

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
      <div className={styles.badges}>
        <Badge dot>
          <BellOutlined />
        </Badge>
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
