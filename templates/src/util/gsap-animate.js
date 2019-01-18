/*
 * GSAP promisified
 * By default we are using TweenLite, TweenMax has a size cost in your final bundle
 * Example:
 * import animate from '../../util/gsap-animate';
 * animate.to(this.container, 0.3, { autoAlpha: 1, delay: 0.2 }).then(()=>{});
 */
import { TweenLite, CSSPlugin } from 'gsap';

const animate = require('gsap-promisify')(Promise, TweenLite);

animate.staggerTo = function (els, duration, props, staggerDelay) {
  return Promise.all(
    els.map((el, i) =>
      animate.to(el, duration, {
        ...props,
        delay: (props.delay || 0) + staggerDelay * i
      })
    )
  );
};

// animate.staggerFrom = function (els, duration, props, staggerDelay) {
//   return Promise.all(
//     els.map((el, i) =>
//       animate.from(el, duration, {
//         ...props,
//         delay: (props.delay || 0) + staggerDelay * i
//       })
//     )
//   );
// };

// animate.staggerFromTo = function (els, duration, initialProps, finalProps, staggerDelay) {
//   return Promise.all(
//     els.map((el, i) =>
//       animate.fromTo(
//         el,
//         duration,
//         { ...initialProps },
//         {
//           ...finalProps,
//           delay: (finalProps.delay || 0) + staggerDelay * i
//         }
//       )
//     )
//   );
// };

export const GSAP_PLUGINS = { CSSPlugin };
export default animate;
