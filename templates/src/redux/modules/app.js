import keys from '../keys';
import reducerRegistry from '../reducer-registry';

const reducerName = 'windowSize';

// Reducer
export default function reducer(state = { width: 0, height: 0 }, action) {
  switch (action.type) {
    case keys.SET_WINDOW_SIZE:
      return action.windowSize;
    default:
      return state;
  }
}

// Action Creator
export function setWindowSize(windowSize) {
  return {
    type: keys.SET_WINDOW_SIZE,
    windowSize
  };
}

// Register Reducers
reducerRegistry.register(reducerName, reducer);
