import React from 'react';
import classnames from 'classnames';
import { useHistory } from 'umi';
import { Tabs, Space } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import TabMenu from './TabMenu';
import useCloseItem from './hooks/useCloseItem';
import * as Icons from '@ant-design/icons';
import { TabsProps } from 'antd/es/tabs';
import useLayout from '@/hooks/useLayout';
import styles from './index.less';
const { TabPane } = Tabs;

const HeaderTabPane: React.FC = () => {
  const { tabPanes, tabKey } = useLayout();
  const history = useHistory();
  const close = useCloseItem(tabPanes);
  const onPaneClose = (key: string) => {
    close(key);
  };
  const onTabClick: TabsProps['onTabClick'] = key => {
    if (tabKey === key) return;
    history.replace(key);
  };

  return (
    <div className={styles.headerTabPane}>
      <Tabs
        activeKey={tabKey}
        onTabClick={onTabClick}
        type="card"
        hideAdd
        tabBarStyle={{ margin: 0 }}
      >
        {tabPanes.map(pane => {
          const tabName = pane.tabName || pane.name;
          const closeClassName = classnames(styles.closeIcon, {
            [styles.open]: tabKey === pane.displayPath,
          });
          const displayPath = pane.displayPath;
          return pane.hideInTabs || !tabName ? null : (
            <TabPane
              key={displayPath}
              tab={
                <TabMenu
                  pathKey={displayPath}
                  tabPanes={tabPanes}
                  keeperKey={pane.keeperKey}
                >
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
      </Tabs>
    </div>
  );
};

export default HeaderTabPane;
