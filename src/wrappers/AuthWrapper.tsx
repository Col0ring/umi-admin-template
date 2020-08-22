import React, { useEffect, useMemo } from 'react';
import { Redirect, matchPath, useLocation, useDispatch } from 'umi';
import { whitePageLiist, notloginedPageList } from '@/router';
import PageLoading from '@/components/PageLoading';
import ForbiddenPage from '@/components/403';
import useLayout from '@/hooks/useLayout';
import useAuth from '@/hooks/useAuth';
import { matchRoles } from '@/utils/route';

const AuthWrapper: React.FC = ({ children }) => {
  const { isLogin, user, roles } = useAuth();
  const { pathname, search } = useLocation();
  const { breadcrumbs } = useLayout();
  const dispatch = useDispatch();

  const isWhiteListPage = useMemo(
    () =>
      whitePageLiist.some(path => {
        return matchPath(pathname, { path, exact: true });
      }),
    [pathname],
  );
  const isNotLoginedPage = useMemo(
    () =>
      notloginedPageList.some(path => {
        return matchPath(pathname, { path, exact: true });
      }),
    [pathname],
  );
  const currentRoute = breadcrumbs[breadcrumbs.length - 1];
  // 必须在 useEffect 中请求，否则会有渲染错误
  useEffect(() => {
    if (isLogin && !user) {
      dispatch({
        type: 'permission/getUserInfo',
      });
    }
  }, [pathname]);
  if (isLogin) {
    if (isNotLoginedPage) {
      return <Redirect to="/"></Redirect>;
    }
    if (user) {
      if (
        !currentRoute ||
        currentRoute.authLayout ||
        matchRoles(roles, currentRoute.roles)
      ) {
        return <>{children}</>;
      } else {
        return <ForbiddenPage />;
      }
    } else {
      return <PageLoading tip="正在获取用户信息" />;
    }
  } else {
    if (isWhiteListPage) {
      return <>{children}</>;
    } else {
      return (
        <Redirect
          to={{ pathname: '/login', search: `?redirect=${pathname + search}` }}
        ></Redirect>
      );
    }
  }
};

export default AuthWrapper;
