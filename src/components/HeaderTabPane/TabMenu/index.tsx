import React, { useMemo } from 'react';
import {
  useDispatch,
  useHistory,
  useLocation,
  useAliveController,
  history,
} from 'umi';
import {
  CloseCircleOutlined,
  CloseOutlined,
  CloseSquareOutlined,
  VerticalLeftOutlined,
  VerticalRightOutlined,
  RedoOutlined,
} from '@ant-design/icons';
import ContextMenu, { MenuItemProps } from '@/components/ContextMenu';
import { MenuItem } from '@/interfaces/app';
import useCloseItem, { isHomePath } from '../hooks/useCloseItem';
export interface TabMenuProps {
  tabPanes: MenuItem[];
  pathKey: string;
}

const TabMenu: React.SFC<TabMenuProps> = ({ tabPanes, pathKey, children }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { pathname, search } = useLocation();
  const { dropScope, clear, refreshScope } = useAliveController();
  const path = pathname + search;
  const closeItem = useCloseItem(tabPanes);

  const contextMenu: MenuItemProps[] = useMemo(
    () => [
      {
        icon: <RedoOutlined />,
        name: '刷新',
        click: key => {
          if (path !== key) {
            dropScope(key).then(() => {
              history.push(key);
            });
          } else {
            refreshScope(key);
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
            dispatch({
              type: 'app/setTabPanes',
              payload: [currentPane],
            });
            clear();
          } else {
            dispatch({
              type: 'app/setTabPanes',
              payload: [],
            });
            history.push('/dashboard');
            clear().then(() => {
              const unlisten = history.listen(() => {
                unlisten && unlisten();
                setTimeout(() => {
                  dropScope(path);
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
          dispatch({
            type: 'app/setTabPanes',
            payload: currentPanes,
          });
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
          dispatch({
            type: 'app/setTabPanes',
            payload: currentPanes,
          });
          closePanes.forEach(pane => {
            dropScope(pane.displayPath);
          });
          if (pathIndex < currentIndex) {
            history.push(key);
            const unlisten = history.listen(() => {
              unlisten && unlisten();
              setTimeout(() => {
                dropScope(path);
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

          dispatch({
            type: 'app/setTabPanes',
            payload: currentPanes,
          });
          closePanes.forEach(pane => {
            dropScope(pane.displayPath);
          });
          if (pathIndex < 0 || pathIndex > currentIndex) {
            history.push(key);
            const unlisten = history.listen(() => {
              unlisten && unlisten();
              setTimeout(() => {
                dropScope(path);
              }, 60);
            });
          }
        },
      },
    ],
    [tabPanes, path],
  );
  return (
    <ContextMenu meta={pathKey} menus={contextMenu}>
      {children}
    </ContextMenu>
  );
};

export default TabMenu;
