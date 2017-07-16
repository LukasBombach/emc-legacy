import fs from 'fs';
import md5 from 'md5';

export default class Movie {

  static titleFromFileName(fileName) {
    const baseName = fileName.replace(/\.(avi|mkv|mpeg|mpg|mov|mp4|m4v)/i, '');
    let movie = baseName.match(/(.*?)(directors(.?)cut|480p|720p|1080p|dvdrip|xvid|cd[0-9]|bluray|dvdscr|brrip|divx|S[0-9]{1,3}E[0-9]{1,3}|Season[\s,0-9]{1,4}|[{([]?[0-9]{4}).*/i);
    if (movie && movie[1]) {
      movie = movie[1].replace(/\./g, ' ').trim();
    } else {
      movie = baseName;
    }
    movie = movie.replace(/([^ I])([A-Z0-9])/g, '$1 $2').trim();
    // movie = movie.substring(movie.indexOf('-') + 1);
    return movie;
  }

  static async getId(pathToFolder, fileName) {
    const stats = await fs.stat(`${pathToFolder}${fileName}`);
    return md5(`${fileName}-${stats.size}`);
  }

  static async fromFile(pathToFolder, fileName) {
    const id = await Movie.getId(pathToFolder, fileName);
    return new Movie({ id, pathToFolder, fileName })
  }

  constructor(data) {
    this.data = data;
  }

  getData() {
    return this.data;
  }
}