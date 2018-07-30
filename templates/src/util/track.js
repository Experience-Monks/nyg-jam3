window.dataLayer = window.dataLayer || [];

/**
 * Dispatch an event with GTM
 *
 * @param {boolean} [action=false] - Action name
 * @param {any} [payload={}] - Action data
 */
function gtmEvent(action: boolean = false, payload: Object = {}) {
  if (action) {
    window.dataLayer.push({
      event: action,
      payload
    });
  }
}

export default gtmEvent;
