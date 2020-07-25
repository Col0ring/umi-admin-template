import React from 'react';
import { useSelector, useDispatch, useHistory } from 'umi';
import { Tabs, Space } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { TabsProps } from 'antd/es/tabs';
import styles from './index.less';
const { TabPane } = Tabs;

const HeaderTabPane: React.FC = () => {
  const { tabPanes, tabKeys } = useSelector(({ app }) => ({
    tabPanes: app.tabPanes,
    tabKeys: app.tabKeys,
  }));
  const dispatch = useDispatch();
  const history = useHistory();
  const onPaneDelete: TabsProps['onEdit'] = key => {
    const currentPanes = tabPanes.filter(pane => pane.displayPath !== key);
    dispatch({
      type: 'app/setTabPanes',
      payload: currentPanes,
    });
  };
  const onTabClick: TabsProps['onTabClick'] = key => {
    if (key === 'app_close_all') {
      return dispatch({
        type: 'app/setTabPanes',
        payload: [],
      });
    }
    if (tabKeys[0] === key) return;
    history.replace(key);
  };

  return (
    <div className={styles.headerTabPane}>
      <Tabs
        activeKey={tabKeys[0]}
        onEdit={onPaneDelete}
        onTabClick={onTabClick}
        type="editable-card"
        hideAdd
        tabBarStyle={{ margin: 0 }}
      >
        {tabPanes.map(pane => {
          const tabName = pane.tabName || pane.name;
          return pane.hideInTabs || !tabName ? null : (
            <TabPane
              tab={pane.tabName || pane.name}
              key={pane.displayPath}
            ></TabPane>
          );
        })}
        {tabPanes.filter(
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
        )}
      </Tabs>
    </div>
  );
};

export default HeaderTabPane;
