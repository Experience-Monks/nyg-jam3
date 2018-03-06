import { createStore, compose, combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

// Reducers
import * as appReducers from './reducers/app';
import * as landingReducers from './reducers/landing';

const rootReducer = combineReducers({
  ...appReducers,
  ...landingReducers,
  routing: routerReducer
});

export const history = createHistory();

const initialState = {};
const enhancers = [];

if (process.env.NODE_ENV !== 'production') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

function enableBatchActions(reducers) {
  return function(state, action) {
    switch (action.type) {
      case 'BATCH_ACTIONS':
        return action.actions.reduce(reducers, state);
      default:
        return reducers(state, action);
    }
  };
}

const composedEnhancers = compose(...enhancers);

const store = createStore(enableBatchActions(rootReducer), initialState, composedEnhancers);

export default store;
