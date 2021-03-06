import React, { Component } from 'react';
import { 
  BrowserRouter as Router, 
  Route, 
  Switch,
} from 'react-router-dom';
import { Home, NotFound } from './Pages';
import Page from './components/Page';
import routes from './routes';
import backgroundImage from './bgShrimp.jpg';
import './App.scss';
import './font/ShrimpFont.otf';
import './font/shrimpfont-webfont.woff';
import './font/shrimpfont-webfont.woff2';

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
          <Switch>
              <Route path="/" exact component={Home} />
              {routes.map(({ name, displayName, path, PageComponent }) => 
                <Route 
                  path={path} 
                  key={path}
                  exact
                  render={(props) => (
                    <Page 
                      name={name} 
                      displayName={displayName}
                      {...props}>
                      <PageComponent />
                    </Page>
                  )}
                />
              )}
              <Route path="*" component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
