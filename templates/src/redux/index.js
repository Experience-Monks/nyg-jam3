import { createStore, combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import createHistory from 'history/createBrowserHistory';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import keys from './keys';

import reducerRegistry from './reducer-registry';

import preloaderReducer from './modules/preloader';
import mainNavReducer from './modules/main-nav';

import { windowSizeReducer, previousRouteReducer, layoutReducer } from './modules/app';

let store;
const initialState = {};
const enhancers = [];

// Reducers
const defaultReducers = history => ({
  router: connectRouter(history),
  preloader: preloaderReducer,
  windowSize: windowSizeReducer,
  previousRoute: previousRouteReducer,
  layout: layoutReducer,
  isMobileMenuOpen: mainNavReducer
});

const enableBatchActions = reducers => {
  return function(state, action) {
    switch (action.type) {
      case keys.BATCH_ACTIONS:
        return action.actions.reduce(reducers, state);
      default:
        return reducers(state, action);
    }
  };
};

const combine = reducers => {
  const reducerNames = Object.keys(reducers);
  Object.keys(initialState).forEach(item => {
    if (reducerNames.indexOf(item) === -1) {
      reducers[item] = (state = null) => state;
    }
  });
  return enableBatchActions(combineReducers(reducers));
};

// Create history
export const history = createHistory();

function createInitialReducer() {
  reducerRegistry.reducers = defaultReducers(history);
  return combine(defaultReducers(history));
}

reducerRegistry.setChangeListener(reducers => {
  store.replaceReducer(combine(reducers));
});

// Enhancers
const composedEnhancers = composeWithDevTools(...enhancers);

// Configure Store
function configureStore() {
  store = createStore(createInitialReducer(), initialState, composedEnhancers);
  return store;
}

export default configureStore();
