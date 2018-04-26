/**
 * mixins, helpers, and other style in JavaScript
 */
import detect from './detect';

const polished = require('polished');

/**
 * Convert pixel value to rems. The default base value is rem,
 * but can be changed by passing a second argument to the function.
 * @function
 * @param {string|number} pxval
 * @param {string} [base = 'rem']
 * @example
 * // Styles as object usage
 * const styles = {
 *   'height': px(10)
 * }
 *
 * // CSS in JS Output
 * element {
 *   'height': '1rem'
 * }
 */
polished.px = function(pxVal, base = 'rem') {
  return '' + pxVal * 0.1 + base;
};

/**
 * CSS to boost animation performance
 * @function
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...polished.gpu()
 * }
 *
 * // CSS in JS Output
 * element {
 *   'backfaceVisibility': 'hidden',
 *   'transformStyle': 'preserve-3d',
 *   'perspective': '1000px' // none if detected browser is Safari
 * }
 */
polished.gpu = function() {
  return {
    backfaceVisibility: 'hidden',
    transformStyle: 'preserve-3d',
    perspective: detect.isSafari ? 'none' : '1000px'
  };
};

/**
 * Generate z-index css programmatically to avoid setting ambiguous z-index value
 * @const zIndexList contain elements in order
 *
 * @function
 * @param {string|number} name
 * @param {string} [list = zIndexList]
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...polished.zIndex(name)
 * }
 *
 * // CSS in JS Output
 * element {
 *   zIndex: [index:number]
 * }
 */
const zIndexList = ['about', 'preloader', 'rotate'];
polished.zIndex = function(name, list = zIndexList) {
  if (!list.includes(name)) {
    throw new Error(`Name(${name}) is not found in z-index list. Please add it to list`);
  }

  return { zIndex: list.indexOf(name) };
};

/**
 * Prevent the element to be draggable
 * @function
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...polished.noSelect()
 * }
 *
 * // CSS in JS Output
 * element {
 *   '-webkit-user-drag': 'none',
 *   '-khtml-user-drag': 'none',
 *   '-moz-user-drag': 'none',
 *   '-o-user-drag': 'none',
 *   'user-drag': 'none'
 * }
 */
polished.noSelect = function() {
  return {
    '-webkit-user-drag': 'none',
    '-khtml-user-drag': 'none',
    '-moz-user-drag': 'none',
    '-o-user-drag': 'none',
    'user-drag': 'none'
  };
};

/**
 * Disable pointer event
 * @function
 * @param {string} [cursor = 'default']
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...disablePointerEvent()
 * }
 *
 * // CSS in JS Output
 * element {
 *   'cursor': 'default',
 *   'pointerEvents': 'none'
 * }
 */
polished.disablePointerEvent = function(cursor = 'default') {
  return {
    cursor,
    pointerEvents: 'none'
  };
};

export default polished;
