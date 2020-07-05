// 全局模块，不雅在这里面引入 import 或者 export 相关的
declare module '*.css';
declare module '*.less';
declare module '*.png';

declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;
  const url: string;
  export default url;
}

interface AnyObject<T = any> {
  [prop: string]: T;
}

type Api<T = any> = T | false;
