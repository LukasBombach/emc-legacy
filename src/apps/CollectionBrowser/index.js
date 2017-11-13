import assignDeep from 'assign-deep';
import AppComponent from '../../AppComponent'

export default class CollectionBrowser extends AppComponent {

    constructor(props) {
        super(props);
        this.state = { data: {} };
    }

    async componentDidMount() {
        this.loadCollectionToState(this.props.collection);
    }

    async loadCollectionToState(collection) {
        await this.loadCollectionFromDatabase(collection);
        await this.loadCollectionFromFileSystem(collection);
        await this.scrapeData();
    }

    async loadCollectionFromDatabase({ id }) {
        const dbRecords = await this.databaseConnector.load(id);
        const data = assignDeep({}, this.state.collection, dbRecords);
        await this.setState({ data });
    }

    async loadCollectionFromFileSystem({ sources }) {
        const files = await this.filesystemConnector.load(sources);
        const data = assignDeep({}, this.state.collection, files);
        await this.setState({ data });
    }

    async scrapeData() {
        for (const item of this.state.data) {
            await this.scrapeItemAndMergeToData(item);
        }
    }

    async scrapeItemAndMergeToData(item) {
        const scrapedItem = await this.scraper.scrape(item);
        const data = assignDeep({}, this.state.collection, { [scrapedItem.id]: scrapedItem });
        await this.setState({ data });
        await this.databaseConnector.save(scrapedItem);
    }

}