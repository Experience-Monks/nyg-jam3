import keys from '../keys';

const defaultState = {
  windowSize: {
    width: 0,
    height: 0
  },
  previousRoute: null
};

// Reducers
export function windowSizeReducer(state = defaultState.windowSize, { type, windowSize }) {
  return type === keys.SET_WINDOW_SIZE ? windowSize : state;
}

export function previousRouteReducer(state = defaultState.previousRoute, { type, previousRoute }) {
  return type === keys.SET_PREV_ROUTE ? previousRoute : state;
}

// Action Creator
export function setWindowSize(windowSize) {
  return {
    type: keys.SET_WINDOW_SIZE,
    windowSize
  };
}

export function setPreviousRoute(previousRoute) {
  return {
    type: keys.SET_PREV_ROUTE,
    previousRoute
  };
}
