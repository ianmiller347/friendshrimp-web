import React from 'react';
import { Instagram, Youtube } from 'feather-icons-react';
import SocialLink from './SocialLink';
import AppleMusicIcon from './AppleMusicIcon';
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
    url: 'https://www.youtube.com/@friendshrimp',
    name: 'youtube',
    displayName: 'YouTube',
    description: 'Youtube. Check out our shrimpy videos',
    Component: () => <Youtube size={size} />,
  },
  {
    url: 'https://music.apple.com/us/artist/friendshrimp/1497627091',
    name: 'applemusic',
    displayName: 'Apple Music',
    description: 'Listen to Friendshrimp on Apple Music',
    Component: () => <AppleMusicIcon size={size} />,
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
      <SocialLink key={socialLink.name} index={index} {...socialLink} />
    ))}
  </ul>
);

export default SocialLinks;
