import { defineConfig } from 'umi';
import setting from './src/setting';
import variables from './theme/variables';

/**
 *路由项应该有有效的路径和key：路径：externalPath、redirect、path三者需要有一个。key:key、externalPath、path三者需要有一个
 * 没有有效名称的 菜单、面包屑和 tabs 不会显示
 * 父级菜单写 path 在点击的时候是没用的。一般来说父级菜单下面会有一个相同path的字级，如果子级在后一个等级路由，可以用 redirect 导向它
 * routes属性
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
 * externalPath：扩展外部的链接
 * key:唯一标示，一般来说用 path 就可以了，但是如果 path 相同可以自己写key
 * activePath：对应路由菜单栏选中的实际路径
 */

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  theme: {
    ...variables,
  },
  title: setting.menuTitle,
  routes: [
    {
      path: '/',
      component: '@/layouts/BlankLayout',
      wrappers: ['@/components/AuthWrapper', '@/components/NprogressWrapper'],
      routes: [
        {
          path: '/login',
          component: '@/pages/login',
          title: 'Umi-Admin-Login',
        },
        {
          path: '/',
          component: '@/layouts/AccessLayout/index',
          routes: [
            {
              path: '/',
              redirect: '/dashboard',
              hideInMenu: true,
            },
            {
              breadcrumbName: '首页',
              path: '/dashboard',
              name: 'dashboard',
              icon: 'GroupOutlined',
              component: '@/pages/dashboard',
            },
            {
              path: '/user',
              name: 'users',
              icon: 'GroupOutlined',
              component: '@/pages/dashboard',
            },
            {
              path: '/dashboard1',
              name: 'dashboard1',
              icon: 'GroupOutlined',
              component: '@/pages/dashboard',
              routes: [
                {
                  path: '/dashboard1',
                  name: 'dashboard11',
                  component: '@/pages/dashboard',
                },
                {
                  path: '/dashboard2',
                  name: 'dashboard2',
                  component: '@/pages/dashboard',
                  routes: [
                    {
                      // path: '/dashboard2',
                      // key: '111',
                      name: 'dashboar22',
                      redirect: '/dashboard3',
                      component: '@/pages/dashboard',
                      externalPath:
                        'https://cn.bing.com/search?q=%E5%A4%96%E9%83%A8%E7%9A%84%E8%8B%B1%E6%96%87+&qs=n&form=QBRE&sp=-1&pq=%E5%A4%96%E9%83%A8%E7%9A%84%E8%8B%B1%E6%96%87+&sc=0-6&sk=&cvid=04A331DAC30D4B43881CBA67087B4E21',
                      routes: [
                        {
                          path: '/dashboard2/:id',
                          name: 'dashboard222',
                          component: '@/pages/dashboard',
                        },
                        {
                          path: '/dashboard333',
                          name: '333',
                          activePath: '/dashboard',
                          breadcrumbName: '333',
                          component: '@/pages/dashboard',
                        },
                        {
                          path: '/dashboard3',
                          externalPath:
                            'https://cn.bing.com/search?q=%E5%A4%96%E9%83%A8%E7%9A%84%E8%8B%B1%E6%96%87+&qs=n&form=QBRE&sp=-1&pq=%E5%A4%96%E9%83%A8%E7%9A%84%E8%8B%B1%E6%96%87+&sc=0-6&sk=&cvid=04A331DAC30D4B43881CBA67',
                          name: 'dashboard3',
                          component: '@/pages/dashboard',
                        },
                      ],
                    },
                  ],
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
  ],
  // dynamicImport: {
  //   loading: '@/components/PageLoading',
  // },

  // 跨域处理，mock 数据时暂时不需要
  // proxy: {
  //   '/api': {
  //     target: 'http://localhost:8000',
  //     changeOrigin: true,
  //     pathRewrite: {
  //       '^/api': '/',
  //     },
  //   },
  // },
});
