import { COLLECTION_LOAD, COLLECTION_LOADED_FS, COLLECTION_LOADED_DB, COLLECTION_LOADED_SCRAPE } from '../actions/collection';
import Database from '../models/database';
import Scraper from '../models/scraper';
import Collection from '../models/collection';

export default store => next => async action => {

  if (action.type !== COLLECTION_LOAD) {
    return next(action)
  }

  next(action);

  const moviesOnFs = await Collection.loadFromFs(action.collection);
  next({ type: COLLECTION_LOADED_FS, items: moviesOnFs });

  const moviesInDb = await Database.load(moviesOnFs);
  next({ type: COLLECTION_LOADED_DB, items: moviesInDb });

  const unscrapedMovies = Object.entries({ ...moviesOnFs, ...moviesInDb })
    .filter(([, movie]) => !!movie.scraped)
    .reduce((acc, [id, movie]) => { acc[id] = movie; return acc; }, {});

  const newlyScrapedMovies = await Scraper.scrape(unscrapedMovies);
  Database.put(newlyScrapedMovies);
  next({ type: COLLECTION_LOADED_SCRAPE, items: newlyScrapedMovies });

}
