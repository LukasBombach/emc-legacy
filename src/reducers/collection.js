import { COLLECTION_LOADED_FS } from '../actions/collection';

export default function collection(state = [], { type, data }) {
  switch (type) {
    case COLLECTION_LOADED_FS:
      return data;
    default:
      return state;
  }
}
