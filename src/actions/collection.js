export const COLLECTION_REQUEST = 'collection/request';
export const COLLECTION_LOADED_FS = 'collection/loaded/fs';
export const COLLECTION_LOADED_DB = 'collection/loaded/db';
export const COLLECTION_LOADED_SCRAPE = 'collection/loaded/scrape';

export const loadCollection = (collectionId) => {
  return { type: COLLECTION_REQUEST, collectionId };
};

