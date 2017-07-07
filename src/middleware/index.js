import { createEpicMiddleware } from 'redux-observable';
import rootEpic from '../epics'

const epicMiddleware = createEpicMiddleware(rootEpic);

export default [
  epicMiddleware
];
