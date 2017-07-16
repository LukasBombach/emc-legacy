import { createEpicMiddleware } from 'redux-observable';
import rootEpic from '../epics'
import collection from './collection'

export default [
  collection,
  createEpicMiddleware(rootEpic)
];
