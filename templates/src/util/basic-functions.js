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
