import noop from 'no-op';

import animate from '../util/gsap-animate';

const defaultProps = {
  x: 0,
  y: 0,
  duration: 0,
  ease: window.Quart.easeInOut
};

let timeoutId;

export default function scrollPage(props = {}, onComplete = noop) {
  const combinedProps = Object.assign({}, defaultProps, props);
  const { x, y, duration, ease } = combinedProps;

  timeoutId && clearTimeout(timeoutId);
  timeoutId = setTimeout(onComplete, duration * 1000);

  animate.to(window, duration, {
    scrollTo: { x, y, autoKill: false, ease }
  });
}
