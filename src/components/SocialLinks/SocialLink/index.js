import React from 'react';

const SocialLink = ({ url, name, displayName, description, Component }) => (
  <li id={`${name}_social-link`} className="social-link">
    <a
      href={url}
      title={`${displayName} - ${description}`}
      target="_blank"
      rel="noopener noreferrer"
      className="social-link__link"
    >
      <Component />
    </a>
  </li>
);

export default SocialLink;
