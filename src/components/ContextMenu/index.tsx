import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
import { useImmer } from 'use-immer';
import { Space } from 'antd';
import useContextMenu from '@/hooks/useContextMenu';
import styles from './index.less';
import setting from '@/layouts/AccessLayout/setting';
export interface MenuItemProps {
  click?: (meta: any, e: React.MouseEvent) => void;
  icon?: React.ReactNode;
  name?: string;
  render?: React.ReactNode;
}
export interface ContextMenuProps {
  meta?: any;
  click?: (meta: any, index: number, e: React.MouseEvent) => void;
  menus?: MenuItemProps[];
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  children,
  menus,
  click,
  meta,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useImmer({
    visible: false,
    top: 0,
    left: 0,
  });

  useContextMenu(ref, {
    click: e => {
      setState(state => {
        state.visible = true;
        if (e.clientX + 140 > window.innerWidth) {
          state.left = e.clientX - 152;
        } else {
          state.left = e.clientX + 12;
        }
        state.top = e.clientY + 10;
      });
    },
    clickAway: () => {
      setState(state => {
        state.visible = false;
      });
    },
  });

  return (
    <div ref={ref} className={styles.menuContainer}>
      {children}
      {state.visible &&
        createPortal(
          <div
            onClick={e => e.stopPropagation()}
            style={{
              position: setting.navbarFixed ? 'fixed' : 'absolute',
              top: state.top,
              left: state.left,
            }}
            className={styles.contextMenu}
          >
            {menus &&
              menus.map((menu, index) => {
                if (menu.render && typeof menu.render === 'function') {
                  return menu.render();
                }
                return (
                  <div
                    onClick={e => {
                      (menu.click && menu.click(meta, e)) ||
                        (click && click(meta, index, e));
                      setState(state => {
                        state.visible = false;
                      });
                    }}
                    key={index}
                    className={styles.item}
                  >
                    <Space size="middle">
                      {menu.icon}
                      <span>{menu.name}</span>
                    </Space>
                  </div>
                );
              })}
          </div>,
          document.body,
        )}
    </div>
  );
};

export default ContextMenu;
