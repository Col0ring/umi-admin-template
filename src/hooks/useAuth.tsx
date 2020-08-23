import { useSelector } from 'umi';
import { matchRoles } from '@/utils/route';
import useLayout from '@/hooks/useLayout';
const useAuth = () => {
  const { user, roles, token, isLogin } = useSelector(({ permission }) => ({
    isLogin: permission.isLogin,
    user: permission.user,
    roles: permission.roles,
    token: permission.token,
  }));
  const { breadcrumbs } = useLayout();
  const currentRoute = breadcrumbs[breadcrumbs.length - 1];
  const isMathRoles = matchRoles(roles, currentRoute?.roles);
  return { user, isLogin, roles, token, isMathRoles };
};

export default useAuth;
