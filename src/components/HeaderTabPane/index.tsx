import React from 'react';
import { useSelector, useDispatch, useHistory } from 'umi';
import { Tabs } from 'antd';
import { TabsProps } from 'antd/es/tabs';
import styles from './index.less';
const { TabPane } = Tabs;

const HeaderTabPane: React.FC = () => {
  const { tabPanes, selectedKeys } = useSelector(({ app }) => ({
    tabPanes: app.tabPanes,
    selectedKeys: app.selectedKeys,
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
    if (selectedKeys[0] === key) return;
    history.replace(key);
  };
  return (
    <div className={styles.headerTabPane}>
      <Tabs
        activeKey={selectedKeys[0]}
        onEdit={onPaneDelete}
        onTabClick={onTabClick}
        type="editable-card"
        hideAdd
        tabBarStyle={{ margin: 0 }}
      >
        {tabPanes.map(pane => {
          return <TabPane tab={pane.name} key={pane.displayPath}></TabPane>;
        })}
      </Tabs>
    </div>
  );
};

export default HeaderTabPane;
