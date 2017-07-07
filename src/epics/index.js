import { combineEpics } from 'redux-observable';
import loadCollection from './loadCollection'

export default combineEpics(
  loadCollection
);
