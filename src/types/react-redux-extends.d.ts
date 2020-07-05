import { Loading } from 'umi';
declare module 'react-redux' {
  export interface DefaultRootState {
    loading: Loading;
  }
}
