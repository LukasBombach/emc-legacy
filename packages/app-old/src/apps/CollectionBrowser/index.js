import {observable} from "mobx";
import {observer} from 'mobx-react';
import assignDeep from 'assign-deep';
import AppComponent from '../../AppComponent'

//import Collection from '@emc/collection'

class Collection {

    @observable items = [];
    collectionDescriptor = null;

    constructor(collectionDescriptor) {
        this.collectionDescriptor = collectionDescriptor;
        this.load();
    }

    sortItems() {

    }

    async load() {
        await this.loadCollectionFromDatabase();
        await this.loadCollectionFromFileSystem();
        await this.scrapeData();
    }

    async loadCollectionFromDatabase() {
        const dbRecords = await this.databaseConnector.load(this.collectionDescriptor.id);
        this.addItems(dbRecords);
    }

    async loadCollectionFromFileSystem() {
        const files = await this.filesystemConnector.load(this.collectionDescriptor.sources);
        this.addItems(files);
    }

    async scrapeData() {
        for (const item of this.items) {
            await this.scrapeItem(item);
        }
    }

    async scrapeItem(item) {
        const scrapedItem = await this.scraper.scrape(item);
        await this.databaseConnector.save(scrapedItem);
        this.addItems([scrapedItem]);
    }

    addItems(items) {
        for (const newItem of items) {
            const existingItem = this.items.find(item => item.id === newItem.id);
            if (existingItem) assignDeep(existingItem, newItem);
            else this.insertItem(newItem);
        }
    }

    insertItem(item) {
        this.items.push(item);
    }

}

@observer
export default class CollectionBrowser extends AppComponent {

    constructor(props) {
        super(props);
        this.collection = new Collection(props.collectionDescriptor);
    }

}