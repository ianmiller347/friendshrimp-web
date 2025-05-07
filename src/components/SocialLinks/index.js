import React from 'react';
import { Facebook, Instagram, Twitter } from 'feather-icons-react';
import SocialLink from './SocialLink';
import SoundCloudIcon from './SoundCloudIcon';
import SpotifyIcon from './SpotifyIcon';
import './style.scss';

const size = 38;

const SOCIAL_LINKS = [
  {
    url: 'https://open.spotify.com/artist/7thXVroKFPfZFHjHTkAsp8?si=TPWFHaOvTOaxonNM9Hi9Ww',
    name: 'spotify',
    displayName: 'Spotify',
    description: 'Listen to Friendshrimp on Spotify',
    Component: () => <SpotifyIcon size={size} />,
  },
  {
    url: 'http://instagram.com/friendshrimp',
    name: 'instagram',
    displayName: 'Instagram',
    description: 'Friendshrimp of Instagram',
    Component: () => <Instagram size={size} />,
  },
  {
    url: 'http://twitter.com/friendshrimps',
    name: 'twitter',
    displayName: 'Twitter',
    description:
      'Twitter. Follow us and make a shrimpy boys more popular lol i promise i have friends',
    Component: () => <Twitter size={size} />,
  },
  {
    url: 'http://facebook.com/friendshrimpmusic',
    name: 'facebook',
    displayName: 'Facebook',
    description: 'We wanna be friends on Facebook',
    Component: () => <Facebook size={size} />,
  },
  {
    url: 'http://soundcloud.com/friendshrimp',
    name: 'soundcloud',
    displayName: 'SoundCloud',
    description: 'Listen to these shrimpy boys on Soundcloud',
    Component: () => <SoundCloudIcon size={size} />,
  },
];

const SocialLinks = () => (
  <ul className="social-links">
    {SOCIAL_LINKS.map((socialLink, index) => (
      <SocialLink
        key={`${socialLink.name}_${index}`}
        index={index}
        {...socialLink}
      />
    ))}
  </ul>
);

export default SocialLinks;
