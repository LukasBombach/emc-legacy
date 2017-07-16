import fs from 'fs';
import md5 from 'md5';
import collectionConfig from '../config/collections';
import MoviesFilter from '../collectionFilters/MoviesFilter';

const readDir = path => new Promise((resolve, reject) => {
  fs.readdir(path, (error, result) => {
    if (error) return reject(error);
    resolve(result);
  })
});

const stat = path => new Promise((resolve, reject) => {
  fs.stat(path, (error, result) => {
    if (error) return reject(error);
    resolve(result);
  })
});

export default class Collection {

  static filters = {
    movies: MoviesFilter,
  };

  static async loadFromFs(collection) {
    const itemsPromises = collection.sources
      .map(source => Collection.loadSourceFromFs(source));
    const items = await Promise.all(itemsPromises);
    return items.reduce((acc, cur) => ({ ...acc, ...cur }), {});
  }

  static async loadSourceFromFs(source) {
    const fileNames = await readDir(source.path);
    const itemPromises = fileNames
      .filter(fileName => !collectionConfig.ignoreFiles.test(fileName))
      // todo exclude / recurse folders
      .map(fileName => Collection.getItemForFile(source.path, fileName));
    const items = await Promise.all(itemPromises);
    const processedItems = Collection.filters[source.type].process(items);
    return processedItems.reduce((obj, item) => {
      obj[item.fingerprint] = item;
      return obj;
    }, {});
  }

  static async getItemForFile(pathToFolder, fileName) {
    const fingerprint = await Collection.getFingerprint(pathToFolder, fileName);
    return { fingerprint, pathToFolder, fileName }
  }

  static async getFingerprint(pathToFolder, fileName) {
    const stats = await stat(`${pathToFolder}/${fileName}`);
    return md5(`${fileName}-${stats.size}`);
  }

}