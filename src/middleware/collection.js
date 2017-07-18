import { COLLECTION_LOAD, COLLECTION_LOADED_FS, COLLECTION_LOADED_DB, COLLECTION_LOADED_SCRAPE } from '../actions/collection';
import Database from '../models/database';
import Scraper from '../models/scraper';
import FileManager from '../collections/fileManager';

export default store => next => async action => {

  if (action.type !== COLLECTION_LOAD) {
    return next(action)
  }

  next(action);

  const itemsOnFs = await FileManager.loadCollection(action.collection);
  Database.putIfNotExist(itemsOnFs);
  next({ type: COLLECTION_LOADED_FS, items: itemsOnFs });

  const itemsInDb = await Database.loadItems(itemsOnFs);
  next({ type: COLLECTION_LOADED_DB, items: itemsInDb });

  const unscrapedItems = Object.entries({ ...itemsOnFs, ...itemsInDb })
    .filter(([, item]) => !item.scraped)
    .reduce((acc, [id, item]) => { acc[id] = item; return acc; }, {});

  const newlyScrapedItems = await Scraper.scrape(unscrapedItems);
  Database.putOrUpdate(newlyScrapedItems);
  next({ type: COLLECTION_LOADED_SCRAPE, items: newlyScrapedItems });

}
