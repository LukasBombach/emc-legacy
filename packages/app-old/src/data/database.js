import deepAssign from 'deep-assign';
import PouchDB from 'pouchdb-browser'
PouchDB.plugin(require('pouchdb-upsert'));

export default class Database {

  static fetchAllOptions = {
    include_docs: true,
  };

  static async loadItems(items) {
    const itemsByType = Database.sortItemsByType(items);
    const dbQueryPromisesForTypes = Object.entries(itemsByType).map(([type, itemsOfType]) => {
      const db = new PouchDB(type);
      const keys = itemsOfType.map(item => item.fingerprint);
      return db.allDocs({ ...Database.fetchAllOptions, keys })
    });
    const itemsInDataBaseByType = await Promise.all(dbQueryPromisesForTypes);
    return itemsInDataBaseByType
      .reduce((obj, { rows }) => ({...obj, ...Database.getItemFromDatabaseRows(rows)}), {});
  }

  static putIfNotExist(items) {
    const itemsByType = Database.sortItemsByType(items);
    Object.entries(itemsByType).map(([type, itemsOfType]) => {
      const db = new PouchDB(type);
      const docs = itemsOfType.map(item => ({ ...item, _id: item.fingerprint}));
      return db.bulkDocs(docs)
    });
  }

  static putOrUpdate(items) {
    const itemsByType = Database.sortItemsByType(items);
    Object.entries(itemsByType).map(([type, itemsOfType]) => {
      const db = new PouchDB(type);
      const upsertPromises = itemsOfType.map(item => db.upsert(item.fingerprint, doc => deepAssign({}, doc, item)));
      return Promise.all(upsertPromises);
    });
  }

  static sortItemsByType(items) {
    const itemsByType = {};
    Object.values(items).forEach(item => {
      itemsByType[item.type] = itemsByType[item.type] || [];
      itemsByType[item.type].push(item);
    });
    return itemsByType;
  }

  static getItemFromDatabaseRows(rows) {
    return rows
      .filter(record => record.error !== 'not_found')
      .reduce((obj, record) => ({...obj, [record.key]: record.doc}), {});
  }

}