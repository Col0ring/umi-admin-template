import React, { memo } from 'react';
import { useDispatch, useSelector } from 'umi';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Layout, Row, Col } from 'antd';
import { Scrollbar } from 'react-scrollbars-custom';
import GlobalHeader from '@/components/GlobalHeader';
import BreadCrumb from '@/components/BreadCrumb';
import HeaderTabPane from '@/components/HeaderTabPane';
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
    <div>
      <Header className={styles.navbar}>
        <Row className={styles.content} gutter={5} justify="space-between">
          <Col sm={{ span: 2 }} xs={{ span: 4 }} className={styles.collapse}>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: styles.trigger,
                onClick: toggleCollapse,
              },
            )}
          </Col>
          <Col md={{ span: 16 }} sm={{ span: 15 }} xs={{ span: 0 }}>
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
          <Col
            xs={{ span: 20 }}
            sm={{ span: 7 }}
            md={{ span: 6 }}
            className={styles.avatarContainer}
          >
            <GlobalHeader />
          </Col>
        </Row>
      </Header>
      <HeaderTabPane />
    </div>
  );
};
export default memo(NavBar);
