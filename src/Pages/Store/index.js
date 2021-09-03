import React from 'react';
import './style.scss';

const Store = () => {
  const brumpoStoreLink =
    'https://brumpo.myspreadshop.com/shrimp?collection=NFgmcBuNir&ref=friendshrimp';
  return (
    <div className="store">
      <h2>Shrimp Store stuff</h2>
      <div className="store__content">
        <marquee className="small">Where my shrimps?</marquee>
      </div>
      <div className="visit-store">
        <h3>Friendshrimp Merch on Brumpo Store</h3>
        <p>Friendshrimp shrimp shrimp items :)</p>
        <div>
          <a
            href={brumpoStoreLink}
            className="button button--visit-store store-link"
            title="Go For a Visit to the Friendshrimp Store"
            target="_blank"
            rel="nofollow"
          >
            Go to Friendshrimp Store
          </a>
        </div>
      </div>
    </div>
  );
}

export default Store;
