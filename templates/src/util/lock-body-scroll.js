import { getScrollTop } from 'get-scroll';

import scrollPage from './scroll-page';

function lockBodyScroll() {
  let scrollPosY = 0;
  let isLocked = false;

  function lock() {
    if (!isLocked) {
      scrollPosY = getScrollTop();
      document.body.style.position = 'fixed';
      document.body.style.overflowY = 'scroll';
      document.body.style.marginTop = `-${scrollPosY}px`;
      isLocked = true;
    }
  }

  function unlock(skipPositionRestore = false) {
    if (isLocked) {
      document.body.style.position = '';
      document.body.style.overflowY = '';
      document.body.style.marginTop = '';
      !skipPositionRestore && scrollPage({ y: scrollPosY }, 0);
      isLocked = false;
    }
  }

  return { isLocked, lock, unlock };
}

export default lockBodyScroll();
