import { createStore, compose, combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

// Reducers
import * as appReducers from './reducers/app';
import * as layoutReducers from './reducers/layout';
import * as landingReducers from './reducers/landing';
// import * as asyncReducers from './reducers/async';

let store;

// const rootReducer = combineReducers({
//   ...appReducers,
//   ...layoutReducers,
//   ...landingReducers,
//   ...asyncReducers,
//   routing: routerReducer
// });

function createReducer(asyncReducers) {
  return combineReducers({
    ...appReducers,
    ...layoutReducers,
    ...landingReducers,
    routing: routerReducer,
    ...asyncReducers
  });
}

export const history = createHistory();

// const initialState = {};
const enhancers = [];

if (process.env.NODE_ENV !== 'production') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

// function enableBatchActions(reducers) {
//   return function(state, action) {
//     switch (action.type) {
//       case 'BATCH_ACTIONS':
//         return action.actions.reduce(reducers, state);
//       default:
//         return reducers(state, action);
//     }
//   };
// }

const composedEnhancers = compose(...enhancers);

function configureStore(initialState) {
  store = createStore(createReducer(), initialState, composedEnhancers);
  store.asyncReducers = {};
  return store;
}

export function injectAsyncReducer(name, asyncReducer) {
  store.asyncReducers[name] = asyncReducer;
  store.replaceReducer(createReducer(store.asyncReducers));
}

// const store = createStore(enableBatchActions(rootReducer), initialState, composedEnhancers);

// export default store;

export default configureStore();
