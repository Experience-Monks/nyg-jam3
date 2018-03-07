import keys from '../keys';

export const windowSize = (state = { width: 0, height: 0 }, action) => {
  switch (action.type) {
    case keys.SET_WINDOW_SIZE:
      return action.windowSize;
    default:
      return state;
  }
};
