import breakpointHandler from './breakpoint-handler';
import setGlobalFontSize from './set-global-font-size';

import store from '../redux';
import { setWindowSize } from '../redux/actions/app';
import { wait } from './basic-functions';

export default async function(width = window.innerWidth, height = window.innerHeight) {
  store.dispatch(setWindowSize({ width, height }));
  breakpointHandler.update(width, height);
  await wait();
  setGlobalFontSize(width, height);
  return Promise.resolve();
}
