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
          path: '/',
          component: '@/layouts/AccessLayout',
          routes: [
            {
              path: '/dashboard',
              icon: 'dashboard',
              component: '@/pages/dashboard',
            },
          ],
        },
        {
          path: '/login',
          component: '@/pages/login',
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
