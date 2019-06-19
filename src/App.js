import React, { Component } from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';

import backgroundImage from './bgShrimp.jpg';
import './App.css';
import './font/ShrimpFont.otf';
import './font/shrimpfont-webfont.woff';
import './font/shrimpfont-webfont.woff2';
import {
  Home,
  Games,
  Shows,
} from './Pages';

class App extends Component {
  render() {
    return (
      <Router>
        <div 
          className="App" 
          style={{
            background: `url(${backgroundImage})`
          }}
        >
          <Route path="/" exact component={Home} />
          <Route path="/games/" component={Games} />
          <Route path="/shows/" component={Shows} />
        </div>
      </Router>
    );
  }
}

export default App;
