import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory';
import rootReducer from '../reducers';
import middlewares from '../middleware';

export const history = createHistory();

const configureStore = preloadedState => createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(thunk, ...middlewares, routerMiddleware(history))
);

export default configureStore;
