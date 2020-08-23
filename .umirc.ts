import { defineConfig } from 'umi';
import variables from './theme/variables';
import routes from './src/router';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  theme: {
    ...variables,
  },
  title: 'Umi Admin',
  routes,
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
