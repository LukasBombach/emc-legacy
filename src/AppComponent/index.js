import { Component } from 'react';
import DatabaseConnector from '../DatabaseConnector';
import FileSystemConnector from '../FileSystemConnector';
import Scraper from '../Scraper';

export default class AppComponent extends Component {

    constructor(props) {
        super(props);
        this.databaseConnector = new DatabaseConnector(`app-${this.constructor.name}`);
        this.filesystemConnector = new FileSystemConnector();
        this.scraper = new Scraper();
    }

}