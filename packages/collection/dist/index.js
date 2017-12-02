var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { observable } from "mobx";
export var Direction;
(function (Direction) {
    Direction["asc"] = "asc";
    Direction["desc"] = "desc";
})(Direction || (Direction = {}));
export class Collection {
    constructor(collectionDescriptor) {
        this.items = [];
        this.collectionDescriptor = null;
        this.sortProperty = 'title';
        this.sortDirection = 'asc';
        this.collectionDescriptor = collectionDescriptor;
        this.load();
    }
    sortBy(property, direction = Direction.asc) {
        this.sortProperty = property;
        this.sortDirection = direction;
        this.items.sort(this.sortFunction.bind(this));
        return this;
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadCollectionFromDatabase();
            yield this.loadCollectionFromFileSystem();
            yield this.scrapeData();
            return this;
        });
    }
    loadCollectionFromDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            // const dbRecords = await this.databaseConnector.load(this.collectionDescriptor.id);
            const dbRecords = [];
            this.addItems(dbRecords);
            return this;
        });
    }
    loadCollectionFromFileSystem() {
        return __awaiter(this, void 0, void 0, function* () {
            // const files = await this.filesystemConnector.load(this.collectionDescriptor.sources);
            const files = [];
            this.addItems(files);
            return this;
        });
    }
    scrapeData() {
        return __awaiter(this, void 0, void 0, function* () {
            for (const item of this.items) {
                yield this.scrapeItem(item);
            }
            return this;
        });
    }
    scrapeItem(item) {
        return __awaiter(this, void 0, void 0, function* () {
            // const scrapedItem = await this.scraper.scrape(item);
            // await this.databaseConnector.save(scrapedItem);
            // this.addItems([scrapedItem]);
            // return this;
            return Promise.resolve(this);
        });
    }
    addItems(items) {
        for (const newItem of items) {
            const existingItem = this.items.find(item => item.id === newItem.id);
            // if (existingItem) assignDeep(existingItem, newItem);
            if (existingItem)
                Object.assign(existingItem, newItem);
            else
                this.insertItem(newItem);
        }
        return this;
    }
    insertItem(item) {
        this.items.splice(this.locationForItem(item) + 1, 0, item);
        return this;
    }
    locationForItem(item, start = 0, end = this.items.length) {
        const pivot = Math.round(start + (end - start) / 2);
        const sortIndex = this.sortFunction(this.items[pivot], item);
        if (sortIndex === 0 || end - start <= 1) {
            return pivot;
        }
        if (sortIndex === -1) {
            return this.locationForItem(item, pivot, end);
        }
        else {
            return this.locationForItem(item, start, pivot);
        }
    }
    sortFunction(a, b) {
        const prop = this.sortProperty;
        if (this.sortDirection === 'asc') {
            return a[prop] < b[prop] ? -1 : a[prop] === b[prop] ? 0 : 1;
        }
        else {
            return a[prop] > b[prop] ? -1 : a[prop] === b[prop] ? 0 : -1;
        }
    }
}
__decorate([
    observable
], Collection.prototype, "items", void 0);
//# sourceMappingURL=index.js.map