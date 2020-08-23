import { IRoute } from 'umi';
import { transformRoutes } from '../utils/route';

/**
 *路由项应该有有效的路径和key：路径：externalPath、redirect、path三者需要有一个（都有优先级依次降低）。key:key、externalPath、path三者需要有一个
 * 没有有效名称的 菜单、面包屑和 tabs 不会显示
 * 父级菜单写 path 在点击的时候是没用的。一般来说父级菜单下面会有一个相同path的字级，如果子级在后一个等级路由，可以用 redirect 导向它
 * path:路由
 * redirect：重定向路由
 * routes：子路由
 * name:菜单与tabs名
 * icon:菜单栏图标
 * breadcrumbName：面包屑名称，不写默认用name
 * tabName:tab名称，不屑默认用name
 * hideChildrenInMenu：是否隐藏子菜单
 * hideInMenu:隐藏菜单
 * hideInTabs:隐藏tabs
 * hideInBreadcrumb：隐藏面包屑
 * breadcrumbPath: 面包屑跳转的path，不写默认遍历子路由判断子路由path是否相同或者没有写（没写是全匹配），如果写了rediect属性会将子路由的redirect属性赋值给该属性，如果没找到就用有效路径。主要是用于处理父级菜单的 path 与子菜单的 redirect 不一致的问题（子菜单没有直接承接父级的path，而是设置一个专门的redirect做跳转的情况，这时需要在父级用设置属性）
 * externalPath：扩展外部的链接
 * key:唯一标示，一般来说用 path 就可以了，但是如果 path 相同可以自己写key
 * activeMenu：对应路由菜单栏选中的实际路径
 * keepAlive:{},对象，用于keepAlive组件的属性配置
 * roles:[]，静态权限
 * authLayout:是否跳过最外层的验证直接进入 layout 内层验证
 */
// 白名单
export const whitePageLiist: string[] = ['/login'];
// 登陆后无法进入的页面（比如登陆后不能进去登陆页面了）,如果是根据权限不同进行配置的请到下面权限页面配置
export const notloginedPageList: string[] = ['/login'];

export const routes: IRoute[] = [
  {
    path: '/',
    component: '@/layouts/BlankLayout',
    wrappers: [
      '@/wrappers/RouteLayoutProviderWrapper',
      '@/wrappers/PageProgressWrapper',
      '@/wrappers/AuthWrapper',
    ],
    routes: [
      {
        path: '/login',
        component: '@/pages/login',
        title: 'Umi-Admin-Login',
      },
      {
        path: '/',
        authLayout: true,
        component: '@/layouts/AccessLayout',
        routes: [
          {
            path: '/',
            redirect: '/dashboard',
            hideInMenu: true,
          },
          {
            roles: [],
            breadcrumbName: '首页',
            path: '/dashboard',
            name: 'dashboard',
            icon: 'GroupOutlined',
            component: '@/pages/dashboard',
            wrappers: ['@/wrappers/KeepAliveWrapper'],
          },
          {
            path: '/nest',
            name: 'nest',
            icon: 'HeatMapOutlined',
            component: '@/pages/nest',
            wrappers: ['@/wrappers/KeepAliveWrapper'],
            routes: [
              {
                path: '/nest',
                redirect: '/nest/nest-1',
              },
              {
                path: 'nest-1',
                name: 'nest-1',
                component: '@/pages/nest/nest-1',
              },
              {
                path: 'nest-2',
                name: 'nest-2',
                component: '@/pages/nest/nest-2',
                routes: [
                  {
                    path: 'nest-2-1',
                    name: 'nest-2-1',
                    component: '@/pages/nest/nest-2/nest-2-1',
                  },
                  {
                    path: 'nest-2-2',
                    name: 'nest-2-2',
                    component: '@/pages/nest/nest-2/nest-2-2',
                  },
                  {
                    hideInMenu: true,
                    path: 'nest-2-3',
                    name: 'nest-2-3',
                    component: '@/pages/nest/nest-2/nest-2-2',
                    activeMenu: '/nest/nest-2/nest-2-1',
                  },
                  {
                    redirect: '/nest/nest-2/nest-2-1',
                  },
                ],
              },
              {
                component: '@/pages/404',
              },
            ],
          },
          {
            path: '/component',
            name: 'Component',
            icon: 'RadarChartOutlined',
            component: '@/pages/component',
            routes: [
              {
                path: '/component',
                redirect: '/component/Switch',
              },
              {
                path: 'Switch',
                name: 'Switch',
                component: '@/pages/component/Switch',
              },
            ],
          },
          {
            component: '@/pages/404',
          },
        ],
      },
    ],
  },
];

export default transformRoutes(routes);
