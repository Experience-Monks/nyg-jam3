export function wait(ms = 0) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function noop() {}

export function preventEvent(e, preventDefault = true, stopPropagation = true) {
  preventDefault && e.preventDefault();
  stopPropagation && e.stopPropagation();
}
