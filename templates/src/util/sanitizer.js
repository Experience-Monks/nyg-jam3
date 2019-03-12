import dompurify from 'dompurify';

const config = {
  ADD_ATTR: ['target']
};

/**
 * DOM Sanitizer to protect against untrust inputs and XSS attacks
 *
 * @param {string} [dirtyInput=''] - Input to sanitize
 * @param {object} [options={}] - Options to override default config
 */
function sanitizer(dirtyInput, options = {}) {
  return dompurify.sanitize(dirtyInput, { ...config, ...options });
}

export default sanitizer;
