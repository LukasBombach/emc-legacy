import { createEpicMiddleware } from 'redux-observable';
import rootEpic from '../epics'

export default [
  createEpicMiddleware(rootEpic)
];
