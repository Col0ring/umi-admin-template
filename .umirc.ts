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
                      // key: '111',
                      name: 'dashboar22',
                      redirect: '/dashboard3',
                      component: '@/pages/dashboard',
                      externalPath:
                        'https://cn.bing.com/search?q=%E5%A4%96%E9%83%A8%E7%9A%84%E8%8B%B1%E6%96%87+&qs=n&form=QBRE&sp=-1&pq=%E5%A4%96%E9%83%A8%E7%9A%84%E8%8B%B1%E6%96%87+&sc=0-6&sk=&cvid=04A331DAC30D4B43881CBA67087B4E21',
                      routes: [
                        {
                          path: '/dashboard2',
                          name: 'dashboard222',
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
