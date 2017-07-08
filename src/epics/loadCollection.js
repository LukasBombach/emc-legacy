import { readdir } from 'fs';
import Rx from 'rxjs/Rx';
import { COLLECTION_REQUEST, COLLECTION_LOADED_FS } from '../actions/collection';

export default function loadCollection(action$) {
  const readDir = Rx.Observable.bindNodeCallback(readdir);
  return action$.ofType(COLLECTION_REQUEST)
    .map(action => action.sources[0].path) // todo make hardcoded shit generic
    .flatMap(path => readDir(path))
    .map(files => files.filter(file => /\.(avi|mkv|mpeg|mpg|mov|mp4|m4v)$/i.test(file)))
    .map(files => ({
      type: COLLECTION_LOADED_FS,
      data: files,
    }));
}
