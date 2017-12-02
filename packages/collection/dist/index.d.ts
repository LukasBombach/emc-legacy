export interface SourceDescriptor {
}
export interface CollectionDescriptor {
    id: string;
    sources: Array<SourceDescriptor>;
}
export declare enum Direction {
    asc = "asc",
    desc = "desc",
}
export interface Item {
    id: string;
}
export declare class Collection {
    items: Array<Item>;
    collectionDescriptor: CollectionDescriptor | null;
    sortProperty: string;
    sortDirection: string;
    constructor(collectionDescriptor: CollectionDescriptor);
    sortBy(property: string, direction?: Direction): Collection;
    load(): Promise<Collection>;
    loadCollectionFromDatabase(): Promise<Collection>;
    loadCollectionFromFileSystem(): Promise<Collection>;
    scrapeData(): Promise<Collection>;
    scrapeItem(item: Item): Promise<Collection>;
    addItems(items: Array<Item>): Collection;
    insertItem(item: Item): Collection;
    locationForItem(item: Item, start?: number, end?: number): number;
    sortFunction(a: any, b: any): 1 | 0 | -1;
}
