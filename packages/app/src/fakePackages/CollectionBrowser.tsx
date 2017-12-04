import * as React from 'react';
import {observer} from 'mobx-react';
import {Collection, CollectionDescriptor} from '@elmc/collection';

export interface ItemListProps {
  collection: Collection;
}

class ItemList extends React.Component<ItemListProps, object> {

  static defaultProps = {
    collection: {
      items: [],
    }
  };

  constructor(props: any) {
    super(props);
  }

  render() {
    console.log(this.props.collection.items);
    return <div>asd</div>;
  }

}

@observer
class CollectionBrowser extends React.Component {

  collection = new Collection({id: 'id', sources: []});

  render() {
    return <ItemList collection={this.collection}/>;
  }

}

export default CollectionBrowser;
