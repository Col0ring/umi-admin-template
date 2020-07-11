import { defineConfig } from 'umi';
import variables from './theme/variables';
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  theme: {
    ...variables,
  },
  title: 'Umi-Admin',
  routes: [
    {
      path: '/',
      component: '@/layouts/BlankLayout',
      wrappers: ['@/components/AuthWrapper', '@/components/NprogressWrapper'],
      routes: [
        {
          path: '/login',
          component: '@/pages/login',
          title: 'Umi-Admin-login',
        },
        {
          path: '/',
          component: '@/layouts/AccessLayout/index',
          routes: [
            {
              path: '/',
              redirect: '/dashboard',
            },
            {
              breadcrumbName: '首页',
              path: '/dashboard',
              name: 'dashboard',
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
                      key: '111',
                      name: 'dashboar22',
                      redirect: '/dashboard3',
                      component: '@/pages/dashboard',
                      routes: [
                        {
                          path: '/dashboard2',
                          name: 'dashboard222',
                          component: '@/pages/dashboard',
                        },
                        {
                          path: '/dashboard3',
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
  dynamicImport: {
    loading: '@/components/PageLoading',
  },

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
