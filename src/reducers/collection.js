import { COLLECTION_LOADED_FS, COLLECTION_LOADED_DB, COLLECTION_LOADED_SCRAPE } from '../actions/collection';

const defaultState = {
  name: '',
  items: {},
};

export default function collection(state = defaultState, { type, items }) {
  switch (type) {
    case COLLECTION_LOADED_FS:
      return { name: state.name, items: { ...state.items, ...items } }; // todo needs deep merge
    case COLLECTION_LOADED_DB:
      return { name: state.name, items: { ...state.items, ...items } }; // todo needs deep merge
    case COLLECTION_LOADED_SCRAPE:
      return { name: state.name, items: { ...state.items, ...items } }; // todo needs deep merge
    default:
      return state;
  }
}
