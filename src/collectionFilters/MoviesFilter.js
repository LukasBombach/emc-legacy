export default class MoviesFilter {

  static fileFilter = /\.(avi|mkv|mpeg|mpg|mov|mp4|m4v)$/i;

  static process(items) {
    return items
      .filter(item => MoviesFilter.fileFilter.test(item.fileName))
      .map(item => ({
        ...item,
        name: MoviesFilter.titleFromFileName(item.fileName)
      }));
  }

  static titleFromFileName(fileName) {
    const baseName = fileName.replace(/\.(avi|mkv|mpeg|mpg|mov|mp4|m4v)/i, '');
    let movie = baseName.match(/(.*?)(directors(.?)cut|480p|720p|1080p|dvdrip|xvid|cd[0-9]|bluray|dvdscr|brrip|divx|S[0-9]{1,3}E[0-9]{1,3}|Season[\s,0-9]{1,4}|[{([]?[0-9]{4}).*/i);
    if (movie && movie[1]) {
      movie = movie[1].replace(/\./g, ' ').trim();
    } else {
      movie = baseName;
    }
    movie = movie.replace(/([^ I1-9])([A-Z0-9])/g, '$1 $2').trim();
    // movie = movie.substring(movie.indexOf('-') + 1);
    return movie;
  }

}