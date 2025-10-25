import React from 'react';
import FeatherIcon, { FeatherIconName } from 'feather-icons-react';

interface ShareLinkProps {
  socialMediaType: FeatherIconName;
  shareLinkUrl: string;
  currentRoute: string;
  displayName: string;
}

const ShareLink: React.FC<ShareLinkProps> = ({
  socialMediaType,
  shareLinkUrl,
  currentRoute,
  displayName,
}) => {
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
      <FeatherIcon icon={socialMediaType} size={24} />
    </a>
  );
};

export default ShareLink;
