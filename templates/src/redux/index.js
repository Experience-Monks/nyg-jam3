import { createStore, compose, combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import reducerRegistry from './reducer-registry';
import { layoutReducer, phoneLayoutReducer, mobileLayoutReducer, tabletLayoutReducer } from './modules/layout';

let store;
const initialState = {};
const enhancers = [];
const defaultReducers = {
  layout: layoutReducer,
  phoneLayout: phoneLayoutReducer,
  tabletLayout: tabletLayoutReducer,
  mobileLayout: mobileLayoutReducer,
  routing: routerReducer
};

// Reducers

const enableBatchActions = reducers => {
  return function(state, action) {
    switch (action.type) {
      case 'BATCH_ACTIONS':
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

function createInitialReducer() {
  reducerRegistry.reducers = defaultReducers;
  return combine(defaultReducers);
}

reducerRegistry.setChangeListener(reducers => {
  store.replaceReducer(combine(reducers));
});

// Enhancers

if (process.env.NODE_ENV !== 'production') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(...enhancers);

// Configure Store

function configureStore() {
  store = createStore(createInitialReducer(), initialState, composedEnhancers);
  return store;
}

export const history = createHistory();

export default configureStore();
