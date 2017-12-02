import * as React from 'react';
import {observer} from 'mobx-react';
import {Collection, CollectionDescriptor} from '@elmc/collection';

export interface ItemListProps {
  collection: Collection;
}

@observer
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

class CollectionBrowser extends React.Component {

  collection = new Collection({id: 'id', sources: []});

  componentDidMount() {
    setInterval(() => {
      this.collection.items.push({ id: 'some id' })
    }, 2000)
  }

  render() {
    return <ItemList collection={this.collection}/>;
  }

}

export default CollectionBrowser;
