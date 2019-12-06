import React from 'react';
import FeatherIcon from 'feather-icons-react';
import SoundCloudIcon from './SoundCloudIcon';

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
        (name !== 'soundcloud') ? (
          <FeatherIcon icon={`${name}`} size={38} />
        ) : <SoundCloudIcon size={38} />
      }
    </a>
  </li>
);

export default SocialLink;
