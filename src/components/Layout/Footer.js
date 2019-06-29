import React from 'react';
import ShareThis from '../ShareThis';
import SocialLinks from '../SocialLinks';

const Footer = ({ currentRoute }) => (
  <footer>
    <ShareThis currentRoute={currentRoute} />
    <SocialLinks />
  </footer>
);

export default Footer;
