import keys from '../keys';
import layout from '../../util/layout';
import type { Layout } from '../../util/layout';

type WindowSize = {
  width: number,
  height: number
};

const defaultState = {
  windowSize: {
    width: window.innerWidth,
    height: window.innerHeight
  },
  previousRoute: null,
  layout: layout.all
};

// Reducers
export function windowSizeReducer(
  state: WindowSize = defaultState.windowSize,
  { type, windowSize }: { type: string, windowSize: WindowSize }
) {
  return type === keys.SET_WINDOW_SIZE ? windowSize : state;
}

export function previousRouteReducer(
  state: ?string = defaultState.previousRoute,
  { type, previousRoute }: { type: string, previousRoute: string }
) {
  return type === keys.SET_PREV_ROUTE ? previousRoute : state;
}

export function layoutReducer(state: Layout = defaultState.layout, { type, layout }: { type: string, layout: Layout }) {
  return type === keys.SET_LAYOUT && Boolean(Object.keys(layout).filter(key => state[key] !== layout[key]).length)
    ? layout
    : state;
}

// Action Creator
export function setWindowSize(windowSize: WindowSize) {
  return {
    type: keys.SET_WINDOW_SIZE,
    windowSize
  };
}

export function setPreviousRoute(previousRoute: string) {
  return {
    type: keys.SET_PREV_ROUTE,
    previousRoute
  };
}

export function setLayout(layout: Layout) {
  return {
    type: keys.SET_LAYOUT,
    layout
  };
}

export function batchActions(actions: Array<*>) {
  return {
    type: keys.BATCH_ACTIONS,
    actions
  };
}
