import React from 'react';
import ShareThis from '../ShareThis';
import SocialLinks from '../SocialLinks';

const Footer = ({ currentRoute }) => (
  <footer>
    <SocialLinks />
    <ShareThis currentRoute={currentRoute} />
  </footer>
);

export default Footer;
