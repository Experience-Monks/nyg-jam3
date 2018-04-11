import keys from '../keys';
import reducerRegistry from '../reducer-registry';

const reducerName = 'async';

// Reducer
export default function reducer(state = false, action) {
  switch (action.type) {
    case keys.TEST_ASYNC:
      return action.test;
    default:
      return state;
  }
}

// Action Creator
export function testAsync(test) {
  return {
    type: keys.TEST_ASYNC,
    test
  };
}

// Register Reducers
reducerRegistry.register(reducerName, reducer);
