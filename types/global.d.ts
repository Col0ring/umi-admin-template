// global module
import { Canceler } from 'axios';
declare global {
  interface Window {
    _axiosPromiseArr?: Canceler[];
  }
}
