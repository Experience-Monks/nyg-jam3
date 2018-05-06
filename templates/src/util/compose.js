/**
 * Function composer for combining multiple higher order components
 *
 * @param {number} functions
 * @returns {Function}
 */
export default (...funcs) => target => funcs.reduce((result, func) => func(result), target);
