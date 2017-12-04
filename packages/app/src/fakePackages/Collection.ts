import {observable} from "mobx";
// import * as assignDeep from 'assign-deep';

export interface SourceDescriptor {

}

export interface CollectionDescriptor {
  id: string;
  sources: Array<SourceDescriptor>
}

export enum Direction {
  asc = 'asc',
  desc = 'desc'
}

export interface Item {
  id: string;
}

export class Collection {

  @observable items: Array<Item> = [];

  collectionDescriptor: CollectionDescriptor | null = null;

  sortProperty: string = 'title';
  sortDirection: string = 'asc';

  constructor(collectionDescriptor: CollectionDescriptor) {
    this.collectionDescriptor = collectionDescriptor;
    this.load();
  }

  sortBy(property: string, direction: Direction = Direction.asc): Collection {
    this.sortProperty = property;
    this.sortDirection = direction;
    this.items.sort(this.sortFunction.bind(this));
    return this;
  }

  async load(): Promise<Collection> {
    await this.loadCollectionFromDatabase();
    await this.loadCollectionFromFileSystem();
    await this.scrapeData();
    return this;
  }

  async loadCollectionFromDatabase(): Promise<Collection> {
    // const dbRecords = await this.databaseConnector.load(this.collectionDescriptor.id);
    const dbRecords: Array<Item> = [];
    this.addItems(dbRecords);
    return this;
  }

  async loadCollectionFromFileSystem(): Promise<Collection> {
    // const files = await this.filesystemConnector.load(this.collectionDescriptor.sources);
    const files: Array<Item> = [];
    this.addItems(files);
    return this;
  }

  async scrapeData(): Promise<Collection> {
    for (const item of this.items) {
      await this.scrapeItem(item);
    }
    return this;
  }

  async scrapeItem(item: Item): Promise<Collection> {
    // const scrapedItem = await this.scraper.scrape(item);
    // await this.databaseConnector.save(scrapedItem);
    // this.addItems([scrapedItem]);
    // return this;
    return Promise.resolve(this);
  }

  addItems(items: Array<Item>): Collection {
    for (const newItem of items) {
      const existingItem = this.items.find(item => item.id === newItem.id);
      // if (existingItem) assignDeep(existingItem, newItem);
      if (existingItem) Object.assign(existingItem, newItem);
      else this.insertItem(newItem);
    }
    return this;
  }

  insertItem(item: Item): Collection {
    this.items.splice(this.locationForItem(item) + 1, 0, item);
    return this;
  }

  locationForItem(item: Item, start: number = 0, end: number = this.items.length): number {
    const pivot = Math.round(start + (end - start) / 2);
    const sortIndex = this.sortFunction(this.items[pivot], item);
    if (sortIndex === 0 || end - start <= 1) {
      return pivot
    }
    if (sortIndex === -1) {
      return this.locationForItem(item, pivot, end);
    } else {
      return this.locationForItem(item, start, pivot);
    }
  }

  sortFunction(a: any, b: any) {
    const prop = this.sortProperty;
    if (this.sortDirection === 'asc') {
      return a[prop] < b[prop] ? -1 : a[prop] === b[prop] ? 0 : 1;
    } else {
      return a[prop] > b[prop] ? -1 : a[prop] === b[prop] ? 0 : -1;
    }
  }
}