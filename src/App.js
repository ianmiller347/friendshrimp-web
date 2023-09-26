import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home, NotFound } from './Pages';
import Page from './components/Page';
import routes from './routes';
import backgroundImage from './bgShrimp.jpg';
import './App.scss';
import './font/ShrimpFont.otf';
import './font/shrimpfont-webfont.woff';
import './font/shrimpfont-webfont.woff2';

const App = () => (
  <BrowserRouter>
    <div
      className="App"
      style={{
        background: `url(${backgroundImage})`,
      }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        {routes.map(({ name, displayName, path, PageComponent }) => (
          <Route
            path={path}
            key={path}
            element={
              <Page name={name} displayName={displayName}>
                <PageComponent />
              </Page>
            }
          />
        ))}
        <Route path="*" component={NotFound} />
      </Routes>
    </div>
  </BrowserRouter>
);

export default App;
