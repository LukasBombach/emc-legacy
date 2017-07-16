import fs from 'fs';
import Rx from 'rxjs/Rx';
import Movie from '../models/movie';
import { COLLECTION_REQUEST, COLLECTION_LOADED_FS } from '../actions/collection';

const FILTER_MOVIES = /\.(avi|mkv|mpeg|mpg|mov|mp4|m4v)$/i;

function readDir(path, filter) {
  return Rx.Observable.bindNodeCallback(fs.readdir)(path)
    .map(files => files.filter(file => filter.test(file)))
}

export default function loadCollection(action$) {
  return action$.ofType(COLLECTION_REQUEST)
    .map(action => action.collection.sources[0].path) // todo make hardcoded shit generic
    .flatMap(path => readDir(path, FILTER_MOVIES))
    .map(files => files.map(file => Movie.titleFromFileName(file)))
    .map(files => ({
      type: COLLECTION_LOADED_FS,
      data: files,
    }));
}
