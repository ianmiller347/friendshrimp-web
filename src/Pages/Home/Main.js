import React from 'react';
import Shrimps from './Shrimps';

const Main = ({ shrimps, weShrimpin }) => {
  return (
    <main>
      <div className="landing-title">
        <h1 className="site-title">Friendshrimp</h1>
        <p className="subtitle">for friends.</p>
      </div>
      {weShrimpin && (
        <div className="we-shrimpin">
          <h3>You are shrimpin!!!</h3>
          <p>You are really addin a lot of shrimps on here my friend i just want to say it's a good job thank you my friend!</p>
        </div>
      )}
      <Shrimps shrimps={shrimps} />
    </main>
  );
}

export default Main;