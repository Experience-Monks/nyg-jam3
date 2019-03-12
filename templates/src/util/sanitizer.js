import dompurify from 'dompurify';

/**
 * DOM Sanitizer to protect against untrust inputs and XSS attacks
 *
 * @param {string} [dirtyInput=''] - Input to sanitize
 */

const config = {
  ADD_ATTR: ['target']
};

function sanitizer(dirtyInput, ...options) {
  return dompurify.sanitize(dirtyInput, { ...config, ...options });
}

export default sanitizer;
