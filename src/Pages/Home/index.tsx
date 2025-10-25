import React, { useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import { Helmet } from 'react-helmet';
import * as shrimpSound from '../../audio/addShrimp.mp3';
import Footer from '../../components/Layout/Footer';
import Header from '../../components/Layout/Header';
import { getRandomInt } from '../../util/rng';
import Main from './Main';
import ShrimpObjects from '../../components/Shrimp/ShrimpObjects';
import ShrimpCredits from './ShrimpCredits';
import './style.scss';

interface ShrimpProps {
  shrimpNumber: number;
  leftOffset: number;
  topOffset: number;
  rotation: number;
  index: number;
  key: string;
}

const SHRIMPS_ARRAY_SIZE = ShrimpObjects.shrimpCount;

const Home: React.FC = () => {
  const [shrimps, setShrimps] = useState<ShrimpProps[]>([]);
  const [weShrimpin, setUsShrimpin] = useState(false);
  const numberOfShrimpsSoFar = shrimps.length;

  const { location } = window;
  const { pathname, search } = location;

  useEffect(() => {
    ReactGA.initialize('UA-37792076-2');
    ReactGA.pageview(`${pathname}${search}`);
  }, []);

  const createShrimpSound = () => {
    const newShrimpSound = new Audio(shrimpSound.default);
    newShrimpSound.play();
  };

  const addAShrimp = (e: React.MouseEvent) => {
    createShrimpSound();
    const leftOffset = e.pageX;
    const topOffset = e.pageY;
    const shrimpId = Math.floor(Math.random() * SHRIMPS_ARRAY_SIZE + 1);

    if (numberOfShrimpsSoFar > 69) {
      setUsShrimpin(true);
      ReactGA.event({
        category: 'shrimp',
        action: 'Clicked lots of shrimps!',
        value: 1,
      });
    }

    ReactGA.event({
      category: 'shrimp',
      action: 'click',
      value: 1,
    });

    const shrimpIndex = numberOfShrimpsSoFar;
    const rotation = shrimpIndex % 2 === 0 ? getRandomInt(0, 180) : 0;

    const shrimpProps: ShrimpProps = {
      shrimpNumber: shrimpId,
      leftOffset: leftOffset,
      topOffset: topOffset,
      rotation,
      index: shrimpIndex,
      key: `index__${shrimpIndex}__shrimp_${shrimpId}`,
    };

    setShrimps([...shrimps, shrimpProps]);

    return false;
  };

  const thisSite = 'https://friendshrimp.com/';
  const siteDescription = 'Friendshrimp is a place for friends! ONLY friends.';

  return (
    <div className="friendshrimp-landing" onClick={(e) => addAShrimp(e)}>
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
      <Main shrimps={shrimps} weShrimpin={weShrimpin} />
      <Footer currentRoute={pathname} />
      <ShrimpCredits />
    </div>
  );
};

export default Home;
