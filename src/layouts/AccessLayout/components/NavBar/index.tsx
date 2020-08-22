import React, { memo } from 'react';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Layout, Row, Col, Affix } from 'antd';
import { Scrollbar } from 'react-scrollbars-custom';
import setting from '@/setting';
import styles from './index.less';
import useMobile from '@/hooks/useMobile';
import Breadcrumb from './Breadcrumb';
import TabPane from './TabPane';
import Userinfo from './Userinfo';
import useAccessLayout from '../../hooks/useAccessLayout';
import useLayout from '../../hooks/useLayout';
import { useLocation } from 'umi';
const { Header } = Layout;

const NavBar: React.FC = () => {
  const { collapsed, setCollapsed } = useAccessLayout();
  const { breadcrumbs, tabPanes, tabKey } = useLayout();
  const { pathname, search } = useLocation();
  const path = pathname + search;
  const isMobile = useMobile();
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };
  return React.createElement(
    setting.globalHeaderFixed || !isMobile ? Affix : 'div',
    null,
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
              className={styles.breadcrumbscrollWrapper}
              noScrollY
              removeTracksWhenNotUsed={true}
              contentProps={{
                style: {
                  height: '100%',
                },
              }}
            >
              <div className={styles.breadcrumb}>
                <Breadcrumb pathname={pathname} breadcrumbs={breadcrumbs} />
              </div>
            </Scrollbar>
          </Col>
          <Col
            xs={{ span: 20 }}
            sm={{ span: 7 }}
            md={{ span: 6 }}
            className={styles.avatarContainer}
          >
            <Userinfo />
          </Col>
        </Row>
      </Header>
      {setting.showTabs && (
        <TabPane tabPanes={tabPanes} tabKey={tabKey} path={path} />
      )}
    </div>,
  );
};
export default memo(NavBar);
