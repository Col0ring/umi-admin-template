import React, { useMemo } from 'react';
import { useHistory, useAliveController } from 'umi';
import {
  CloseCircleOutlined,
  CloseOutlined,
  CloseSquareOutlined,
  VerticalLeftOutlined,
  VerticalRightOutlined,
  ReloadOutlined,
  RedoOutlined,
} from '@ant-design/icons';
import pathToRegexp from 'path-to-regexp';
import ContextMenu, { MenuItemProps } from '@/components/ContextMenu';
import { LayoutRoute } from '@/interfaces/layouts';
import useCloseTab from '../../../hooks/useCloseTab';
import { isHomePath } from '@/utils/route';
import useLayout from '../../../hooks/useLayout';

export interface TabMenuProps {
  tabPanes: LayoutRoute[];
  pathKey: string;
  keeperKey: string | RegExp;
  path: string;
}

const TabMenu: React.FC<TabMenuProps> = ({
  tabPanes,
  pathKey,
  keeperKey,
  children,
  path,
}) => {
  const history = useHistory();
  const { setTabPanes } = useLayout();
  const { dropScope, clear, refreshScope } = useAliveController();
  const closeItem = useCloseTab(tabPanes, path);
  keeperKey = pathToRegexp(keeperKey);
  const contextMenu: MenuItemProps[] = useMemo(
    () => [
      {
        icon: <RedoOutlined />,
        name: '刷新',
        click: key => {
          if (path !== key) {
            dropScope(keeperKey).then(() => {
              history.push(key);
            });
          } else {
            refreshScope(keeperKey);
          }
        },
      },
      {
        icon: <ReloadOutlined />,
        name: '刷新全部',
        click: key => {
          if (path !== key) {
            clear().then(() => {
              history.push(key);
              const unlisten = history.listen(() => {
                unlisten && unlisten();
                setTimeout(() => {
                  dropScope(keeperKey);
                }, 60);
              });
            });
          } else {
            clear();
            refreshScope(keeperKey);
          }
        },
      },
      {
        icon: <CloseOutlined />,
        name: '关闭',
        click: key => {
          closeItem(key);
        },
      },
      {
        icon: <CloseCircleOutlined />,
        name: '关闭所有',
        click: () => {
          // 如果 key是首页
          if (isHomePath(path)) {
            const currentPane = tabPanes.find(
              pane => pane.displayPath === path,
            );
            currentPane && setTabPanes([currentPane]);
            clear();
          } else {
            setTabPanes([]);
            history.push('/');
            clear().then(() => {
              const unlisten = history.listen(() => {
                unlisten && unlisten();
                setTimeout(() => {
                  clear();
                }, 60);
              });
            });
          }
        },
      },
      {
        icon: <CloseSquareOutlined />,
        name: '关闭其他',
        click: key => {
          const currentPanes = tabPanes.filter(
            pane => pane.displayPath === key,
          );
          setTabPanes(currentPanes);
          if (path === key) {
            clear();
          } else {
            history.push(key);
            const unlisten = history.listen(() => {
              unlisten && unlisten();
              setTimeout(() => {
                clear();
              }, 60);
            });
          }
        },
      },
      {
        icon: <VerticalRightOutlined />,
        name: '关闭左侧',
        click: key => {
          const pathIndex = tabPanes.findIndex(
            pane => pane.displayPath === path,
          );
          const currentIndex = tabPanes.findIndex(
            pane => pane.displayPath === key,
          );
          const currentPanes = tabPanes.slice(currentIndex);
          const closePanes = tabPanes.slice(0, currentIndex);
          setTabPanes(currentPanes);
          closePanes.forEach(pane => {
            dropScope(pane.keeperKey);
          });
          if (pathIndex < currentIndex) {
            history.push(key);
            const unlisten = history.listen(() => {
              unlisten && unlisten();
              setTimeout(() => {
                dropScope(
                  closePanes.find(pane => pane.displayPath === path)
                    ?.keeperKey || path,
                );
              }, 60);
            });
          }
        },
      },
      {
        icon: <VerticalLeftOutlined />,
        name: '关闭右侧',
        click: key => {
          const pathIndex = tabPanes.findIndex(
            pane => pane.displayPath === path,
          );
          const currentIndex = tabPanes.findIndex(
            pane => pane.displayPath === key,
          );
          const currentPanes = tabPanes.slice(0, currentIndex + 1);
          const closePanes = tabPanes.slice(currentIndex + 1);
          setTabPanes(currentPanes);
          closePanes.forEach(pane => {
            dropScope(pane.keeperKey);
          });
          if (pathIndex < 0 || pathIndex > currentIndex) {
            history.push(key);
            const unlisten = history.listen(() => {
              unlisten && unlisten();
              setTimeout(() => {
                dropScope(
                  closePanes.find(pane => pane.displayPath === path)
                    ?.keeperKey || path,
                );
              }, 60);
            });
          }
        },
      },
    ],
    [tabPanes, keeperKey, path],
  );
  return (
    <ContextMenu meta={pathKey} menus={contextMenu}>
      {children}
    </ContextMenu>
  );
};

export default TabMenu;
