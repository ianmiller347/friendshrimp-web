import React from 'react';
import FeatherIcon from 'feather-icons-react';

const ShareLink = ({ socialMediaType, shareLinkUrl, currentRoute, displayName }) => {
  const thisSite = 'https://friendshrimp.com';
  const encodedUrl = encodeURIComponent(`${thisSite}${currentRoute}`);
  const shareUrl = `${shareLinkUrl}${encodedUrl}`;

  return (
    <a
      href={shareUrl}
      title={`Share on ${displayName}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <FeatherIcon 
        icon={socialMediaType} 
        size={24} 
      />
    </a>
  );
};


export default ShareLink;
