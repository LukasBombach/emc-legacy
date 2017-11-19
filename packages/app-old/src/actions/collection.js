export const COLLECTION_REQUEST = 'collection/request';
export const COLLECTION_LOAD = 'collection/load';
export const COLLECTION_LOADED_FS = 'collection/loaded/fs'; // todo deprecate
export const COLLECTION_LOADED_DB = 'collection/loaded/db';
export const COLLECTION_LOADED_SCRAPE = 'collection/loaded/scrape';

// export const loadCollection = collection => ({ type: COLLECTION_REQUEST, collection });
export const loadCollection = collection => ({ type: COLLECTION_LOAD, collection });

