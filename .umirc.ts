import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      component: '@/layouts/BlankLayout',
      wrappers: ['@/components/AuthWrapper', '@/components/NprogressWrapper'],
      routes: [
        {
          path: '/login',
          component: '@/pages/login',
        },
        {
          path: '/',
          component: '@/layouts/AccessLayout',
          routes: [
            {
              path: '/dashboard',
              name: 'dashboard',
              icon: 'GroupOutlined',
              component: '@/pages/dashboard',
            },
            {
              path: '/dashboard2',
              name: 'dashboard2',
              component: '@/pages/dashboard',
              routes: [
                {
                  path: '/dashboard2',
                  name: 'dashboard2',
                  component: '@/pages/dashboard',
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
