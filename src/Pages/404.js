import React from 'react';
import ReactGA from 'react-ga';
import { Helmet } from 'react-helmet';
import Footer from '../components/Layout/Footer';
import Header from '../components/Layout/Header';

class NotFound extends React.Component {
  componentDidMount() {
    ReactGA.initialize('UA-37792076-2');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  render() {
    const { location } = this.props;

    const canonicalUrl = 'https://friendshrimp.com/404';
    const siteDescription = 'Friendshrimp is a place for friends! ONLY friends.';

    return (
      <div className="friendshrimp-page-not-found-where-my-god-damn-shrimps-david">
        <Helmet>
          <link rel="canonical" href={canonicalUrl} />
          <meta property="og:url" content={canonicalUrl} />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={`where my shrimps | Friendshrimp. (for friends :)`} />
          <meta 
            property="og:description" 
            content={`page not found we can not find your shrimps.. ${siteDescription}`} 
          />
        </Helmet>
        <Header />
        <main>
          <div className="page-not-found">
            <h1 className="page-title">where my shrimps</h1>
            <p>Sorry we could not find your shrimps :(((</p>
          </div>
        </main>
        <Footer currentRoute={location.pathname} />
      </div>
    );
  }
}

export default NotFound;
