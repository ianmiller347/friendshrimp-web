import React from 'react';
import './style.scss';

const Store = () => {
  return (
    <div className="store">
      <h2>Shrimp Store stuff</h2>
      <div className="store__content">
        <marquee className="small">
          Where my shrimps?
        </marquee>
      </div>
      <div>
        <h3>The Rest of the Store Coming Soon!</h3>
        <p><em>The shrimp store is coming soon, more one of a kind shrimp items for sure</em></p>
      </div>
    </div>
  );
}

export default Store;
