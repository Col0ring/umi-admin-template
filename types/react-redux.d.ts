import { Loading, AppModelState, PermissionModelState } from 'umi';

declare module 'react-redux' {
  export interface DefaultRootState {
    loading: Loading;
    app: AppModelState;
    permission: PermissionModelState;
    [key: string]: any;
  }
}
