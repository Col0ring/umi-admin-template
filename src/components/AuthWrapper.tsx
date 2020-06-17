import React, { useEffect } from 'react';
import { ConnectRC, connect, AuthProps, Loading, Redirect } from 'umi';
import PageLoading from '@/components/PageLoading';

type AuthWrapperProps = Pick<AuthProps, 'isLogin' | 'user'>;

const AuthWrapper: ConnectRC<AuthWrapperProps> = ({
  location,
  children,
  isLogin,
  user,
  dispatch,
}) => {
  const { pathname } = location;
  // 必须在 useEffect 中请求，否则会有渲染错误
  useEffect(() => {
    if (isLogin && !user) {
      dispatch!({
        type: 'permission/getUserInfo',
      });
    }
  }, [pathname]);

  if (isLogin) {
    if (pathname === '/login') {
      return <Redirect to="/"></Redirect>;
    }
    if (user) {
      return <>{children}</>;
    } else {
      return <PageLoading tip="正在获取用户信息" />;
    }
  } else {
    if (pathname === '/login') {
      return <>{children}</>;
    } else {
      return <Redirect to="/login"></Redirect>;
    }
  }
};

const mapStateToProps = ({
  permission,
}: {
  permission: AuthProps;
  loading: Loading;
}) => {
  return {
    isLogin: permission.isLogin,
    user: permission.user,
  };
};

export default connect(mapStateToProps)(AuthWrapper);
