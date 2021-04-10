import React from 'react';
import SocialLink from './SocialLink';
import './style.scss';

const SOCIAL_LINKS = [
  {
    url: 'https://open.spotify.com/artist/7thXVroKFPfZFHjHTkAsp8?si=TPWFHaOvTOaxonNM9Hi9Ww',
    name: 'spotify',
    displayName: 'Spotify',
    description: 'Listen to Friendshrimp on Spotify',
  },
  {
    url: 'http://instagram.com/friendshrimp',
    name: 'instagram',
    displayName: 'Instagram',
    description: 'Friendshrimp of Instagram',
  },
  {
    url: 'http://twitter.com/friendshrimps',
    name: 'twitter',
    displayName: 'Twitter',
    description: 'Twitter. Follow us and make a shrimpy boys more popular lol i promise i have friends',
  },
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
