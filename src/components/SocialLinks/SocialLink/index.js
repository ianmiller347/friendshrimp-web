import React from 'react';
import FeatherIcon from 'feather-icons-react';
import SoundCloudIcon from './SoundCloudIcon';
import SpotifyIcon from './SpotifyIcon';

const NonFeatherIcon = ({ name, size }) => {
  switch (name) {
    case 'soundcloud': {
      return <SoundCloudIcon size={size} />;
    }
    case 'spotify': {
      return <SpotifyIcon size={size} />;
    }
    default:
      return null;
  }
}

const nonFeatherLinks = [
  'soundcloud',
  'spotify'
];

const SocialLink = ({ url, name, displayName, description }) => (
  <li id={`${name}_social-link`} className="social-link">
    <a 
      href={url} 
      title={`${displayName} - ${description}`} 
      target="_blank"
      rel="noopener noreferrer"
      className="social-link__link"
    >
      {
        !nonFeatherLinks.includes(name) ? (
          <FeatherIcon icon={`${name}`} size={38} />
        ) : <NonFeatherIcon name={name} size={38} />
      }
    </a>
  </li>
);

export default SocialLink;
