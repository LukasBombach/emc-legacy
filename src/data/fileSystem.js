import fs from 'fs';
import md5 from 'md5';
import collectionConfig from '../config/collections';
import Movies from '../collections/movies';

export default class FileSystem {

  static filters = {
    movies: Movies,
  };

  static async loadCollection(collection) {
    const itemsPromises = collection.sources
      .map(source => FileSystem.loadSourceFromFs(source));
    return (await Promise.all(itemsPromises))
      .reduce((acc, cur) => ({ ...acc, ...cur }), {});
  }

  // todo exclude / recurse folders
  static async loadSourceFromFs(source) {
    const fileNames = await FileSystem.readDirAsPromised(source.path);
    const itemPromises = fileNames
      .filter(fileName => !collectionConfig.ignoreFiles.test(fileName))
      .map(fileName => FileSystem.getItemForFile(source.type, source.path, fileName));
    return (await Promise.all(itemPromises))
      .filter(FileSystem.filters[source.type].filter)
      .map(FileSystem.filters[source.type].enrich)
      .reduce((obj, item) => ({ ...obj, [item.fingerprint]: item }), {});
  }

  static async getItemForFile(type, pathToFolder, fileName) {
    const fingerprint = await FileSystem.getFingerprint(pathToFolder, fileName);
    return { type, fingerprint, pathToFolder, fileName }
  }

  static async getFingerprint(pathToFolder, fileName) {
    const stats = await FileSystem.statAsPromised(`${pathToFolder}/${fileName}`);
    return md5(`${fileName}-${stats.size}`);
  }

  static readDirAsPromised = path => new Promise((resolve, reject) => {
    fs.readdir(path, (error, result) => { if (error) return reject(error); resolve(result); })
  });

  static statAsPromised = path => new Promise((resolve, reject) => {
    fs.stat(path, (error, result) => { if (error) return reject(error); resolve(result); })
  });

}