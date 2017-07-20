export default class Scraper {

  static async scrapeSingleItem(item) {
    const url = `http://www.omdbapi.com/?t=${encodeURIComponent(item.name)}&y=&plot=short&r=json&apikey=4b86b9f1`;
    const res = await fetch(url);
    const omdbJson = await res.json();
    const movie = Scraper.mapOmdbToMovie(omdbJson);
    return { ...movie, ...item, scraped: true }
  }

  static mapOmdbToMovie(omdbJson) {
    const keys = Object.keys(omdbJson);
    const movie = {};
    let n = keys.length;
    let key;
    while (n--) {
      key = keys[n];
      movie[key.toLowerCase()] = omdbJson[key];
    }
    return movie;
  }


}
