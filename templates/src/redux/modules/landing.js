import keys from '../keys';
import reducerRegistry from '../reducer-registry';

const reducerName = 'landingLoaded';

// Reducer
export default function reducer(state: boolean = false, action: Object) {
  switch (action.type) {
    case keys.LANDING_LOADED:
      return action.loaded;
    default:
      return state;
  }
}

// Action Creators
export function setLandingLoaded(loaded: Object) {
  return {
    type: keys.LANDING_LOADED,
    loaded
  };
}

// Register Reducers
reducerRegistry.register(reducerName, reducer);
