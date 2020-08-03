import { useCallback } from 'react';
import {
  matchPath,
  useLocation,
  useDispatch,
  useHistory,
  useAliveController,
} from 'umi';
import { MenuItem } from '@/interfaces/app';

export function isHomePath(path: string): boolean {
  return !!matchPath(path, { path: '/dashboard', exact: true });
}
const useCloseItem = (tabPanes: MenuItem[]) => {
  const { pathname, search } = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const { dropScope } = useAliveController();
  const path = pathname + search;
  const close = useCallback(
    (key: string) => {
      const currentIndex = tabPanes.findIndex(pane => pane.displayPath === key);
      const currentPanes = tabPanes.filter(pane => pane.displayPath !== key);
      if (currentPanes.length === 0) {
        if (isHomePath(key) && isHomePath(path)) {
          return;
        }
        dispatch({
          type: 'app/setTabPanes',
          payload: currentPanes,
        });
        const unlisten = history.listen(() => {
          unlisten && unlisten();
          setTimeout(() => {
            dropScope(key);
          }, 60);
        });
        history.push('/dashboard');
      } else {
        dispatch({
          type: 'app/setTabPanes',
          payload: currentPanes,
        });
        if (key === path) {
          const unlisten = history.listen(() => {
            unlisten && unlisten();
            setTimeout(() => {
              dropScope(key);
            }, 60);
          });
          if (currentIndex === currentPanes.length) {
            history.push(currentPanes[currentIndex - 1].displayPath);
          } else {
            history.push(currentPanes[currentIndex].displayPath);
          }
        } else {
          dropScope(key);
        }
      }
    },
    [tabPanes, path],
  );
  return close;
};

export default useCloseItem;
