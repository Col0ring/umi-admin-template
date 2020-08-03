import React from 'react';
import classnames from 'classnames';
import { useSelector, useHistory } from 'umi';
import { Tabs, Space } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import TabMenu from './TabMenu';
import useCloseItem from './hooks/useCloseItem';
import * as Icons from '@ant-design/icons';
import { TabsProps } from 'antd/es/tabs';
import styles from './index.less';
const { TabPane } = Tabs;

const HeaderTabPane: React.FC = () => {
  const { tabPanes, tabKeys } = useSelector(({ app }) => ({
    tabPanes: app.tabPanes,
    tabKeys: app.tabKeys,
  }));
  const history = useHistory();
  const close = useCloseItem(tabPanes);
  const onPaneClose = (key: string) => {
    close(key);
  };
  const onTabClick: TabsProps['onTabClick'] = key => {
    // if (key === 'app_close_all') {
    //   return dispatch({
    //     type: 'app/setTabPanes',
    //     payload: [],
    //   });
    // }
    if (tabKeys[0] === key) return;
    history.replace(key);
  };

  return (
    <div className={styles.headerTabPane}>
      <Tabs
        activeKey={tabKeys[0]}
        onTabClick={onTabClick}
        type="card"
        hideAdd
        tabBarStyle={{ margin: 0 }}
      >
        {tabPanes.map(pane => {
          const tabName = pane.tabName || pane.name;
          const closeClassName = classnames(styles.closeIcon, {
            [styles.open]: tabKeys[0] === pane.displayPath,
          });
          const displayPath = pane.displayPath;
          return pane.hideInTabs || !tabName ? null : (
            <TabPane
              key={displayPath}
              tab={
                <TabMenu pathKey={displayPath} tabPanes={tabPanes}>
                  <Space className={styles.pane}>
                    <div>
                      {typeof pane.icon === 'string' &&
                        React.createElement((Icons as AnyObject)[pane.icon])}
                      <span>{pane.tabName || pane.name}</span>
                    </div>
                    <CloseCircleOutlined
                      onClick={e => {
                        e.stopPropagation();
                        onPaneClose(displayPath);
                      }}
                      className={closeClassName}
                    />
                  </Space>
                </TabMenu>
              }
            ></TabPane>
          );
        })}
        {/* {tabPanes.filter(
          pane => !pane.hideInTabs && (pane.tabName || pane.name),
        ).length > 0 && (
          <TabPane
            tab={
              <Space size={5}>
                关闭所有
                <CloseCircleOutlined />
              </Space>
            }
            key="app_close_all"
            closable={false}
          ></TabPane>
        )} */}
      </Tabs>
    </div>
  );
};

export default HeaderTabPane;
