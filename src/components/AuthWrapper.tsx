import React, { useEffect } from 'react';
import {
  ConnectRC,
  connect,
  PermissionModelState,
  Loading,
  Redirect,
  matchPath,
} from 'umi';

import PageLoading from '@/components/PageLoading';

type AuthWrapperProps = Pick<PermissionModelState, 'isLogin' | 'user'>;

const AuthWrapper: ConnectRC<AuthWrapperProps> = ({
  location,
  children,
  isLogin,
  user,
  dispatch,
}) => {
  const { pathname, search } = location;
  // 必须在 useEffect 中请求，否则会有渲染错误
  useEffect(() => {
    if (isLogin && !user) {
      dispatch!({
        type: 'permission/getUserInfo',
      });
    }
  }, [pathname]);

  const isLoginPage = matchPath(pathname, { path: '/login', exact: true });

  if (isLogin) {
    if (isLoginPage) {
      return <Redirect to="/"></Redirect>;
    }
    if (user) {
      return <>{children}</>;
    } else {
      return <PageLoading tip="正在获取用户信息" />;
    }
  } else {
    if (isLoginPage) {
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

const mapStateToProps = ({
  permission,
}: {
  permission: PermissionModelState;
  loading: Loading;
}) => {
  return {
    isLogin: permission.isLogin,
    user: permission.user,
  };
};

export default connect(mapStateToProps)(AuthWrapper);
