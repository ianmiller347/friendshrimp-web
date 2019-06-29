import React from 'react';
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
      playingAudio: false,
    };
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
    const shrimpIndex = this.state.shrimps.length;

    const shrimpProps = {
      shrimpNumber: shrimpId,
      leftOffset: leftOffset,
      topOffset: topOffset,
      index: shrimpIndex,
      key: `index__${shrimpIndex}__shrimp_${shrimpId}`,
    };

    const newShrimps = [].concat(this.state.shrimps);
    newShrimps.push(shrimpProps);
    this.setState({
      shrimps: newShrimps,
    });
  
    return false;
  }

  render() {
    const { location } = this.props;

    return (
      <div className="friendshrimp-landing" onClick={(e) => this.addAShrimp(e)}>
        <Header />
        <main>
          <div className="landing-title">
            <h1 className="site-title">friendshrimp</h1>
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
