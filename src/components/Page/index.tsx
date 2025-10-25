import React, { useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router';
import { Helmet } from 'react-helmet';
import ReactGA from 'react-ga';
import Header from '../Layout/Header/';
import Footer from '../Layout/Footer';

interface PageProps {
  name: string;
  displayName: string;
  children: ReactNode;
}

const Page: React.FC<PageProps> = ({ name, displayName, children }) => {
  const location = useLocation();
  useEffect(() => {
    ReactGA.initialize('UA-37792076-2');
    ReactGA.pageview(location.pathname + location.search);
  }, [location]);

  const thisSite = 'https://friendshrimp.com';
  const canonicalUrl = `${thisSite}${location.pathname}`;
  const siteDescription = 'Friendshrimp is a place for friends! ONLY friends.';

  return (
    <>
      <Helmet>
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={`${displayName} | Friendshrimp. (for friends :)`}
        />
        <meta
          property="og:description"
          content={`${displayName} on FRIENDSHRIMP. ${siteDescription}`}
        />
        <meta
          name="description"
          content={`${displayName} on FRIENDSHRIMP. ${siteDescription}`}
        />
      </Helmet>
      <Header />
      <main className={`page--${name}`}>
        <h1 className="page-title">{displayName}</h1>
        {children}
      </main>
      <Footer currentRoute={location.pathname} />
    </>
  );
};

export default Page;
