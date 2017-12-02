/// <reference types="react" />
import * as React from 'react';
export interface Collection {
    items: Array<any>;
}
export interface ItemListProps {
    collection: Collection;
}
declare class CollectionBrowser extends React.Component {
    collection: {
        items: string[];
    };
    render(): JSX.Element;
}
export default CollectionBrowser;
