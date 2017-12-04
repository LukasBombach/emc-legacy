var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import * as React from 'react';
import { observer } from 'mobx-react';
import { Collection } from '@elmc/collection';
class ItemList extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        console.log(this.props.collection.items);
        return React.createElement("div", null, "asd");
    }
}
ItemList.defaultProps = {
    collection: {
        items: [],
    }
};
let CollectionBrowser = class CollectionBrowser extends React.Component {
    constructor() {
        super(...arguments);
        this.collection = new Collection({ id: 'id', sources: [] });
    }
    render() {
        return React.createElement(ItemList, { collection: this.collection });
    }
};
CollectionBrowser = __decorate([
    observer
], CollectionBrowser);
export default CollectionBrowser;
//# sourceMappingURL=CollectionBrowser.js.map