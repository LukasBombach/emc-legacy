import 'rxjs';
import { COLLECTION_REQUEST, COLLECTION_LOADED_FS } from '../actions/collection';

export default function loadCollection(action$) {
  return action$.ofType(COLLECTION_REQUEST)
    .delay(3000)
    .mapTo({
      type: COLLECTION_LOADED_FS,
      data: ['COLLECTION_LOADED_FS'],
    });
}
