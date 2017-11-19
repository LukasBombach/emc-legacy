import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import collection from './collection';

export default combineReducers({
  routing,
  collection,
});
