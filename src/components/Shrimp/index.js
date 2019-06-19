import React from "react";
import ShrimpObjects from './ShrimpObjects';

const Shrimp = ({ shrimpNumber, leftOffset, topOffset, index }) => {
  const shrimpSrc = ShrimpObjects[shrimpNumber];
  return (
    <img 
      src={shrimpSrc} 
      alt={`shrimp number ${index} on the page`}
      style={{
        position: `absolute`,
        left: `${leftOffset}px`,
        top: `${topOffset}px`,
      }}
    />
  );
};

export default Shrimp;
