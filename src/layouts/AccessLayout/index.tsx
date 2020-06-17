import React from 'react';
import setting from '@/setting';
import { Layout, Menu } from 'antd';
import { ConnectProps, connect } from 'umi';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
const { Header, Sider, Content } = Layout;

interface AccessLayoutProps extends ConnectProps {
  collapsed: boolean;
}

class AccessLayout extends React.Component<AccessLayoutProps> {
  toggle = (collapsed: boolean) => {
    const { dispatch } = this.props;
    dispatch!({
      type: 'app/toggleCollapse',
      payload: collapsed,
    });
  };

  render() {
    const { collapsed } = this.props;
    return (
      <Layout id="components-layout-demo-custom-trigger">
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              nav 1
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              nav 2
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              nav 3
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: 'trigger',
                onClick: () => this.toggle(!collapsed),
              },
            )}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = ({
  app: { collapsed },
}: {
  app: { collapsed: boolean };
}) => {
  return {
    collapsed,
  };
};

export default connect(mapStateToProps)(AccessLayout);
