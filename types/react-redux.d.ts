import { Loading, PermissionModelState } from 'umi';

declare module 'react-redux' {
  export interface DefaultRootState {
    loading: Loading;
    permission: PermissionModelState;
    [key: string]: any;
  }
}
