import React from 'react';
import ReactGA from 'react-ga';
import { Helmet } from 'react-helmet';
import * as shrimpSound from '../audio/addShrimp.mp3';
import Shrimp from '../components/Shrimp';
import Footer from '../components/Layout/Footer';
import Header from '../components/Layout/Header';

const SHRIMPS_ARRAY_SIZE = 11;

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shrimps: [],
    };
  }

  componentDidMount() {
    ReactGA.initialize('UA-37792076-2');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  createShrimpSound = () => {
    const newShrimpSound = new Audio(shrimpSound);
    newShrimpSound.play();
  }

  addAShrimp = (e) => {
    this.createShrimpSound();

    const leftOffset = e.pageX;
    const topOffset = e.pageY;
    const shrimpId = Math.floor((Math.random() * SHRIMPS_ARRAY_SIZE) + 1);
    
    // ga('send', 'event', 'shrimp', 'click', 'page body');
    ReactGA.event({
      category: 'shrimp',
      action: 'click',
      value: 'page body',
    });

    const shrimpIndex = this.state.shrimps.length;

    const shrimpProps = {
      shrimpNumber: shrimpId,
      leftOffset: leftOffset,
      topOffset: topOffset,
      index: shrimpIndex,
      key: `index__${shrimpIndex}__shrimp_${shrimpId}`,
    };

    this.setState(prevState => ({
      shrimps: [
        ...prevState.shrimps,
        shrimpProps,
      ],
    }));
  
    return false;
  }

  render() {
    const { location } = this.props;

    const thisSite = 'https://friendshrimp.com/';
    const siteDescription = 'Friendshrimp is a place for friends! ONLY friends.';

    return (
      <div className="friendshrimp-landing" onClick={(e) => this.addAShrimp(e)}>
        <Helmet>
          <link rel="canonical" href={thisSite} />
          <meta property="og:url" content={thisSite} />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={`Friendshrimp. (for friends :)`} />
          <meta 
            property="og:description" 
            content={`Click or tap anywhere for some shrimps to join your party :) ${siteDescription}`} 
          />
        </Helmet>
        <Header />
        <main>
          <div className="landing-title">
            <h1 className="site-title">Friendshrimp</h1>
            <p className="subtitle">for friends.</p>
          </div>
          {
            this.state.shrimps.map(shrimpProps => <Shrimp {...shrimpProps} />)
          }
        </main>
        <Footer currentRoute={location.pathname} />
      </div>
    );
  }
}

export default Home;
