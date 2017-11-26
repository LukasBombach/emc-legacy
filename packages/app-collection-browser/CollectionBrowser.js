import React, { Component } from 'react';
import { observer } from 'mobx-react';
// import Collection from '@elmc/collection';

const ItemList = observer(class ItemList extends Component {

    static get defaultProps() {
        return {
          collection: {
            items: [],
          }
        }
    };

    render() {
        console.log(this.props.collection.items);
        return <div>asd</div>;
    }

});

class CollectionBrowser extends Component {

    collection = { items: ['a', 'b'] };

    render() {
        return <ItemList collection={this.collection} />;
    }

}

export default CollectionBrowser;
