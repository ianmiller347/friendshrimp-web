import React from 'react';

const ShareLink = ({ socialMediaType, shareLinkUrl, currentRoute }) => {
  const thisSite = 'https://friendshrimp.com';
  const encodedUrl = encodeURIComponent(`${thisSite}${currentRoute}`);
  const shareUrl = `${shareLinkUrl}${encodedUrl}`;

  return (
    <a
      href={shareUrl}
      title={`Share on ${socialMediaType}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {socialMediaType}
    </a>
  );
};

export default ShareLink;
