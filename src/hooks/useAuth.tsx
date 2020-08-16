import { useSelector } from 'umi';

const useAuth = () => {
  const { user, roles, token, isLogin } = useSelector(({ permission }) => ({
    isLogin: permission.isLogin,
    user: permission.user,
    roles: permission.roles,
    token: permission.token,
  }));
  return { user, isLogin, roles, token };
};

export default useAuth;
