import { Loading, AppModelState } from 'umi';

declare module 'react-redux' {
  export interface DefaultRootState {
    loading: Loading;
    app: AppModelState;
    [key: string]: any;
  }
}
