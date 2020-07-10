import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
NProgress.configure({ showSpinner: false });

export function progressStart() {
  NProgress.start();
}

export function progressDone() {
  NProgress.done();
}
