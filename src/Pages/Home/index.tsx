import React, { useEffect, useRef } from 'react';
import ReactGA from 'react-ga';
import { Helmet } from 'react-helmet';
import Footer from '../../components/Layout/Footer';
import Header from '../../components/Layout/Header';
import Main from './Main';
import ShrimpsClicks from '../../components/ShrimpsClicks';
import ShrimpsCredits from '../../components/ShrimpsCredits';
import './style.scss';

const Home: React.FC = () => {
  const { location } = window;
  const { pathname, search } = location;
  const shrimpsClicksParentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ReactGA.initialize('UA-37792076-2');
    ReactGA.pageview(`${pathname}${search}`);
  }, []);

  const thisSite = 'https://friendshrimp.com/';
  const siteDescription = 'Friendshrimp is a place for friends! ONLY friends.';

  return (
    <div className="friendshrimp-landing" ref={shrimpsClicksParentRef}>
      <Helmet>
        <link rel="canonical" href={thisSite} />
        <meta property="og:url" content={thisSite} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`Friendshrimp. (for friends :)`} />
        <meta
          property="og:description"
          content={`Click or tap anywhere for some shrimps to join your party :) ${siteDescription}`}
        />
        <meta
          name="description"
          content={`Friendshrimps! Click or tap anywhere for some shrimps to join your party :) ${siteDescription}`}
        />
      </Helmet>
      <Header />
      <Main />
      <ShrimpsClicks parentRef={shrimpsClicksParentRef} />
      <Footer currentRoute={pathname} />
      <ShrimpsCredits />
    </div>
  );
};

export default Home;
