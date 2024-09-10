import React from 'react';
import ShrimpDonorWall from '../../components/ShrimpDonorWall';
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
        <h3 className="text-content">Friendshrimp Merch on Brumpo Store</h3>
        <div>
          <a
            href={brumpoStoreLink}
            className="button button--visit-store store-link"
            title="Go For a Visit to the Friendshrimp Store"
            target="_blank"
            rel="nofollow noreferrer"
          >
            Go to Friendshrimp Store
          </a>
        </div>
      </div>
      <ShrimpDonorWall />
    </div>
  );
};

export default Store;
