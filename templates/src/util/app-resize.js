import breakpointHandler from './breakpoint-handler';
import setGlobalFontSize from './set-global-font-size';

import store from '../redux';
import { setWindowSize } from '../redux/actions/app';
import { wait } from './basic-functions';

/**
 * Application Resize Manager
 * When the browser resizes it will update the breakpoints and update the global fontsize
 *
 * @param {Number} [width=window.innerWidth]
 * @param {Number} [height=window.innerHeight]
 * @returns
 */
async function appResize(width = window.innerWidth, height = window.innerHeight) {
  store.dispatch(setWindowSize({ width, height }));
  breakpointHandler.update(width, height);
  await wait();
  setGlobalFontSize(width, height);
  return Promise.resolve();
}

export default appResize;
