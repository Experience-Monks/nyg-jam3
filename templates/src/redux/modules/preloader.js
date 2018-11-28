import keys from '../keys';
import reducerRegistry from '../reducer-registry';

const reducerName = 'preloader';

const defaultState = {
  preloader: {
    progress: 0,
    ready: false
  }
};

// Reducer
export default function preloaderReducer(state = defaultState.preloader, action) {
  switch (action.type) {
    case keys.SET_PROGRESS:
      return {
        ...state,
        progress: action.progress
      };
    case keys.SET_READY:
      return {
        ...state,
        ready: action.ready
      };
    default:
      return state;
  }
}

// Action Creators
export function setReady(ready) {
  return {
    type: keys.SET_READY,
    ready
  };
}

export function setProgress(progress) {
  return {
    type: keys.SET_PROGRESS,
    progress
  };
}

// Register Reducers
reducerRegistry.register(reducerName, preloaderReducer);
