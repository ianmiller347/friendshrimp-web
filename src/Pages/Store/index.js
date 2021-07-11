import React from 'react';
import './style.scss';

const Store = () => {
  return (
    <div className="store">
      <h2>Shrimp Store stuff</h2>
      <div className="store__content">
        <h3>
          <strong className="large">This month only, </strong>
          one of a kind shrimp shirt
        </h3>
        <marquee className="small">
          Now is your chance to own this lovely t-shirt: friendshrimp, 
          a place for friends website, aren't you having a good time????
        </marquee>
        <p className="description">
          The black t-shirt with white friendshrimp text is one of those shirts that you probably&nbsp;
          want to have because people wear shirts and so do friends but JUST friends&nbsp;
          nothing more.
        </p>
        <div>
          <iframe
            className="fundraising-widget"
            width="300px"
            height="403px"
            src="https://www.customink.com/fundraising/widgets/friendshrimp"
          />
        </div>
        <div>
          <p>This shirt will be unavailable after July 31!</p>
          <p>Only chance to get this shrimp text shrimp shirt with the friendshrimp text ONLY (just friends)</p>
          <p>
            <a
              href="https://www.customink.com/fundraising/friendshrimp"
              title="Friendshrimp Fundraiser on CustomInk"
              rel="noopener nofollow"
              target="_blank"
            >
              More details here
            </a>
          </p>
        </div>
      </div>
      <div>
        <h3>The Rest of the Store Coming Soon!</h3>
        <p><em>The shrimp store is coming soon, more one of a kind shrimp items for sure</em></p>
      </div>
    </div>
  );
}

export default Store;
