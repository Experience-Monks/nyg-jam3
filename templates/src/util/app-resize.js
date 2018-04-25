import breakpointHandler from './breakpoint-handler';
import setGlobalFontSize from './set-global-font-size';

import store from '../redux';
import { setWindowSize } from '../redux/modules/app';
import { wait } from './basic-functions';

/**
 * Application Resize Manager
 * When the browser resizes it will update the breakpoints and update the global font size
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
}

export default appResize;
