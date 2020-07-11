import React, { memo } from 'react';
import { useDispatch, useSelector } from 'umi';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Layout, Row, Col } from 'antd';
import { Scrollbar } from 'react-scrollbars-custom';
import GlobalHeader from '@/components/GlobalHeader';
import BreadCrumb from '@/components/BreadCrumb';

import styles from './NavBar.less';
const { Header } = Layout;

const NavBar: React.FC = () => {
  const dispatch = useDispatch();
  const { collapsed } = useSelector(({ app }) => ({
    collapsed: app.collapsed,
  }));

  const toggleCollapse = () => {
    dispatch({
      type: 'app/toggleCollapse',
      payload: !collapsed,
    });
  };
  return (
    <Header className={styles.navbar}>
      <Row className={styles.content} justify="space-between">
        <Col span={20} className={styles.left}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: styles.trigger,
              onClick: toggleCollapse,
            },
          )}
          <Scrollbar
            className={styles.breadcrumbScrollWrapper}
            noScrollY
            removeTracksWhenNotUsed={true}
            contentProps={{
              style: {
                height: '100%',
              },
            }}
          >
            <div className={styles.breadcrumb}>
              <BreadCrumb />
            </div>
          </Scrollbar>
        </Col>
        <Col span={4} className={styles.right}>
          <GlobalHeader />
        </Col>
      </Row>
    </Header>
  );
};
export default memo(NavBar);
