/*
 * GSAP promisified
 * By default we are using TweenLite, TweenMax has a size cost in your final bundle
 * Example:
 * import animate from '../../util/gsap-animate';
 * animate.to(this.container, 0.3, { autoAlpha: 1, delay: 0.2 }).then(()=>{});
 */

require('gsap/src/uncompressed/plugins/CSSPlugin.js');
require('gsap/src/uncompressed/TweenLite.js');

const animate = require('gsap-promisify')(Promise, window.TweenLite);

animate.staggerTo = function(els, duration, props, delay) {
  return Promise.all(
    els.map((el, i) =>
      animate.to(el, duration, {
        ...props,
        delay: props.delay + delay * i
      })
    )
  );
};

export const TweenLite = window.TweenLite;
export default animate;
