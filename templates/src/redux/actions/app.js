import keys from '../keys';

export const setWindowSize = function(windowSize) {
  return {
    type: keys.SET_WINDOW_SIZE,
    windowSize
  };
};
