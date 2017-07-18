import fs from 'fs';
import md5 from 'md5';
import collectionConfig from '../config/collections';
import Movies from './movies';

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

export default class FileManager {

  static filters = {
    movies: Movies,
  };

  static async loadCollection(collection) {
    const itemsPromises = collection.sources
      .map(source => FileManager.loadSourceFromFs(source));
    const items = await Promise.all(itemsPromises);
    return items.reduce((acc, cur) => ({ ...acc, ...cur }), {});
  }

  static async loadSourceFromFs(source) {
    const fileNames = await readDir(source.path);
    const itemPromises = fileNames
      .filter(fileName => !collectionConfig.ignoreFiles.test(fileName))
      // todo exclude / recurse folders
      .map(fileName => FileManager.getItemForFile(source.type, source.path, fileName));
    const items = await Promise.all(itemPromises);
    const processedItems = FileManager.filters[source.type].filterAndEnrich(items);
    return processedItems
      .reduce((obj, item) => ({ ...obj, [item.fingerprint]: item }), {});
  }

  static async getItemForFile(type, pathToFolder, fileName) {
    const fingerprint = await FileManager.getFingerprint(pathToFolder, fileName);
    return { type, fingerprint, pathToFolder, fileName }
  }

  static async getFingerprint(pathToFolder, fileName) {
    const stats = await stat(`${pathToFolder}/${fileName}`);
    return md5(`${fileName}-${stats.size}`);
  }

}