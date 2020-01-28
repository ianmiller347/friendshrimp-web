import React from 'react';
import ShrimpObjects from '../../../components/Shrimp/ShrimpObjects';

const Friendshrimp = (shrimpNumber) => (
  <img
    src={ShrimpObjects[9]}
    className="friendshrimp-on-your-photo"
    alt="Friendshrimp on your pic!! He is a little shrimp :)"
  />
);

const FriendshrimpPhoto = ({ photo, alt, shrimpNumber }) => (
  <div className="friendshrimp-photo-booth">
    <img 
      src={photo} 
      className="friendshrimp-photo-booth--photo"
      alt={alt || 'no shrinimpiduh? o wa'}
    />
    <Friendshrimp shrimpNumber={shrimpNumber} />
  </div>
);

export default FriendshrimpPhoto;
