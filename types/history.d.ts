export { Location } from 'history';
declare module 'history' {
  export interface Location {
    query: AnyObject;
  }
}
