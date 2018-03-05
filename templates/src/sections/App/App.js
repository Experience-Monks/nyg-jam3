import React, { Component } from 'react';

import RotateScreen from '../../components/Rotate/Rotate';

import detect from '../../util/detect';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  componentWillMount() {
    if (process.env.NODE_ENV !== 'production') {
      const { whyDidYouUpdate } = require('why-did-you-update');

      if (document.location.search.indexOf('performance') >= 0) {
        whyDidYouUpdate(React);
      }
    }
  }

  render() {
    return [
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>,
      detect.isMobile && <RotateScreen key="rotate" />
    ];
  }
}

export default App;
