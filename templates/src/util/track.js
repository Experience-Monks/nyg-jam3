window.dataLayer = window.dataLayer || [];

export default function gtmEvent(action = false, payload = {}) {
  if (action) {
    window.dataLayer.push({
      event: action,
      payload
    });
  }
}
