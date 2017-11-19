import {observer} from 'mobx-react';
import Collection from '@emc/collection'
import AppComponent from '../../AppComponent'

@observer
export default class CollectionBrowser extends AppComponent {

    constructor(props) {
        super(props);
        this.collection = new Collection(props.collectionDescriptor);
    }

}