import React from 'react';
import SocialLink from './SocialLink';
import './style.css';

const SOCIAL_LINKS = [
  {
    url: 'http://facebook.com/friendshrimpmusic',
    name: 'facebook',
    displayName: 'Facebook',
    description: 'We wanna be friends on Facebook',
  },
  {
    url: 'http://soundcloud.com/friendshrimp',
    name: 'soundcloud',
    displayName: 'SoundCloud',
    description: 'Listen to these shrimpy boys on Soundcloud',
  },
  {
    url: 'http://instagram.com/friendshrimp',
    name: 'instagram',
    displayName: 'Instagram',
    description: 'Friendshrimp of Instagram',
  },
  {
    url: 'http://twitter.com/friendshrimpa',
    name: 'twitter',
    displayName: 'Twitter',
    description: 'Twitter. Follow us and make a shrimpy boys more popular lol i promise i have friends',
  },
];

const SocialLinks = () => (
  <ul className="social-links">
    {SOCIAL_LINKS.map((socialLink, index) => (
      <SocialLink 
        key={`${socialLink.name}_${index}`} 
        index={index} 
        { ...socialLink }
      />
    ))}
  </ul>
);

export default SocialLinks;
