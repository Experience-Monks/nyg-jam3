/**
 * Wait a specific amount of time and return a promise
 * Promisified setTimeout
 *
 * @export
 * @param {number} [ms=0]
 * @returns {Promise}
 */
export function wait(ms = 0) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Noop function to reuse in function definitions
 *
 * @export
 */
export function noop() {}

/**
 * Prevent event, includes preventDefault and stopPropagation
 *
 * @export
 * @param {any} e
 * @param {boolean} [preventDefault=true]
 * @param {boolean} [stopPropagation=true]
 */
export function preventEvent(e, preventDefault = true, stopPropagation = true) {
  preventDefault && e.preventDefault();
  stopPropagation && e.stopPropagation();
}
