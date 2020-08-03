import React, { useEffect, useCallback } from 'react';
import { useClickAway } from 'ahooks';
interface Options {
  click?: (e: MouseEvent) => void;
  clickAway?: (e: MouseEvent) => void;
}
const useContextMenu = (
  target: React.RefObject<HTMLDivElement>,
  options?: Options,
) => {
  const click = options?.click;
  const clickAway = options?.clickAway;
  useClickAway(
    e => clickAway && clickAway(e as MouseEvent),
    target.current,
    'contextmenu',
  );
  useClickAway(e => clickAway && clickAway(e as MouseEvent), target.current);
  const onClick = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      click && click(e);
    },
    [click],
  );
  useEffect(() => {
    target.current?.addEventListener('contextmenu', onClick);
    return () => {
      target.current?.removeEventListener('contextmenu', onClick);
    };
  }, [target.current, onClick]);
};

export default useContextMenu;
