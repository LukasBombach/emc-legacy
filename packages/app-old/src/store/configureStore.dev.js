import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory';
import rootReducer from '../reducers';
import middlewares from '../middleware';

export const history = createHistory();

const configureStore = preloadedState => {
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(applyMiddleware(
      thunk,
      routerMiddleware(history),
      ...middlewares,
      createLogger()
    ))
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    })
  }

  return store;
};

export default configureStore;
