import React from 'react';
import { Helmet } from "react-helmet";
import Header from '../Layout/Header/';
import Footer from '../Layout/Footer';

class Page extends React.Component {
  render() {
    const { 
      name, 
      displayName, 
      children, 
      location,
      ...otherProps 
    } = this.props;

    const thisSite = 'https://friendshrimp.com';
    const canonicalUrl = `${thisSite}${location.pathname}`;
    const siteDescription = 'Friendshrimp is a place for friends! ONLY friends.';

    return (
      <>
        <Helmet>
          <link rel="canonical" href={canonicalUrl} />
          <meta property="og:url" content={canonicalUrl} />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={`${displayName} | Friendshrimp. (for friends :)`} />
          <meta property="og:description" content={`${displayName} on FRIENDSHRIMP. ${siteDescription}`} />
        </Helmet>
        <Header />
        <main className={`page--${name}`} {...otherProps}>
          <h1 className="page-title">{displayName}</h1>
          {children}
        </main>
        <Footer currentRoute={location.pathname} />
      </>
    );
  }
}

export default Page;
