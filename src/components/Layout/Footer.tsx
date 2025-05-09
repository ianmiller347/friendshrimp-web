import React from 'react';
import ShareThis from '../ShareThis';
import SocialLinks from '../SocialLinks';

interface FooterProps {
  currentRoute: string;
}

const Footer: React.FC<FooterProps> = ({ currentRoute }) => (
  <footer>
    <ShareThis currentRoute={currentRoute} />
    <SocialLinks />
  </footer>
);

export default Footer;
