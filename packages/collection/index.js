import { observable } from "mobx";

export default class Collection {

    @observable items = [];

    collectionDescriptor = null;

    sortProperty = 'title';
    sortDirection = 'asc';

    constructor(collectionDescriptor) {
        this.collectionDescriptor = collectionDescriptor;
        this.load();
    }

    sortBy(property, direction = 'asc') {
        this.sortProperty = property;
        this.sortDirection = direction;
        this.items.sort(this.sortFunction.bind(this));
        return this;
    }

    async load() {
        await this.loadCollectionFromDatabase();
        await this.loadCollectionFromFileSystem();
        await this.scrapeData();
        return this;
    }

    async loadCollectionFromDatabase() {
        const dbRecords = await this.databaseConnector.load(this.collectionDescriptor.id);
        this.addItems(dbRecords);
        return this;
    }

    async loadCollectionFromFileSystem() {
        const files = await this.filesystemConnector.load(this.collectionDescriptor.sources);
        this.addItems(files);
        return this;
    }

    async scrapeData() {
        for (const item of this.items) {
            await this.scrapeItem(item);
        }
        return this;
    }

    async scrapeItem(item) {
        const scrapedItem = await this.scraper.scrape(item);
        await this.databaseConnector.save(scrapedItem);
        this.addItems([scrapedItem]);
        return this;
    }

    addItems(items) {
        for (const newItem of items) {
            const existingItem = this.items.find(item => item.id === newItem.id);
            if (existingItem) assignDeep(existingItem, newItem);
            else this.insertItem(newItem);
        }
        return this;
    }

    insertItem(item) {
        this.items(this.locationForItem(item) + 1, 0, item);
        return this;
    }

    locationForItem(item, start = 0, end = this.items.length) {
        const pivot = parseInt(start + (end - start) / 2, 10);
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

    sortFunction(a, b) {
        const prop = this.sortProperty;
        if (this.sortDirection === 'asc') {
            return a[prop] < b[prop] ? -1 : a[prop] === b[prop] ? 0 : 1;
        } else {
            return a[prop] > b[prop] ? -1 : a[prop] === b[prop] ? 0 : -1;
        }
    }
}