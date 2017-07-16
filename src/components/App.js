import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadCollection } from '../actions';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  componentDidMount() {
    this.props.loadCollection({
      id: 'ab182be8f0',
      sources: [
        { type: 'movies', path: '/Users/luke/Movies/__filme' },
        { type: 'movies', path: '/Users/luke/Movies/' }
      ]
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default connect(
  ({ collection }) => ({ collection }),
  { loadCollection }
)(App);
