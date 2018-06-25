import keys from '../keys';
import layout from '../../util/layout';

const defaultState = {
  windowSize: {
    width: window.innerWidth,
    height: window.innerHeight
  },
  previousRoute: null,
  layout: layout.all
};

// Reducers
export function windowSizeReducer(state = defaultState.windowSize, { type, windowSize }) {
  return type === keys.SET_WINDOW_SIZE ? windowSize : state;
}

export function previousRouteReducer(state = defaultState.previousRoute, { type, previousRoute }) {
  return type === keys.SET_PREV_ROUTE ? previousRoute : state;
}

export function layoutReducer(state = defaultState.layout, { type, layout }) {
  return type === keys.SET_LAYOUT && Boolean(Object.keys(layout).filter(key => state[key] !== layout[key]).length)
    ? layout
    : state;
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

export function setLayout(layout) {
  return {
    type: keys.SET_LAYOUT,
    layout
  };
}

export function batchActions(actions) {
  return {
    type: keys.BATCH_ACTIONS,
    actions
  };
}
