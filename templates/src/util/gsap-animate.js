/*
 * GSAP promisified
 * By default we are using TweenLite, TweenMax has a size cost in your final bundle
 * Example:
 * import animate from '../../util/gsap-animate';
 * animate.to(this.container, 0.3, { autoAlpha: 1, delay: 0.2 }).then(()=>{});
 */
import TweenLite from 'gsap/TweenLite';
import CSSPlugin from 'gsap/CSSPlugin';
import ScrollToPlugin from 'gsap/ScrollToPlugin';

const animate = require('gsap-promisify')(Promise, TweenLite);

animate.staggerTo = function(els, duration, props, delay) {
  return Promise.all(
    els.map((el, i) =>
      animate.to(el, duration, {
        ...props,
        delay: (props.delay || 0) + delay * i
      })
    )
  );
};

export const GSAP_PLUGINS = { CSSPlugin, ScrollToPlugin };
export default animate;
