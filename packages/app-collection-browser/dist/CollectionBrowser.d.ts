/// <reference types="react" />
import * as React from 'react';
import { Collection } from '@elmc/collection';
export interface ItemListProps {
    collection: Collection;
}
declare class CollectionBrowser extends React.Component {
    collection: Collection;
    componentDidMount(): void;
    render(): JSX.Element;
}
export default CollectionBrowser;
