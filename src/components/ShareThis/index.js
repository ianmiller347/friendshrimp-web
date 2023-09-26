import React, { useState } from 'react';
import FeatherIcon from 'feather-icons-react';
import ShareLink from './ShareLink';

import './style.scss';

const shareLinkTypesList = [
  {
    name: 'facebook',
    displayName: 'Facebook',
    url: 'https://www.facebook.com/sharer/sharer.php?u=',
  },
  {
    name: 'twitter',
    displayName: 'Twitter',
    url: 'https://twitter.com/home?status=Friendshrimps+are+for+friends',
  },
  {
    name: 'linkedin',
    displayName: 'LinkedIn',
    url: 'https://www.linkedin.com/shareArticle?mini=true&title=Friendshrimp&summary=&source=&url=',
  },
  {
    name: 'mail',
    displayName: 'Email',
    url: 'mailto:?subject=Lol+Friendshrimp+Site',
  },
];

const stopAndSet = (e, show) => {
  e.stopPropagation();
  return !show;
};

const ShareThis = ({ currentRoute }) => {
  const [showingList, toggleList] = useState(false);

  return (
    <div className="sharethis-container">
      <button
        title="Share this site to your friends"
        className="sharethis__toggle"
        onClick={(e) => toggleList(stopAndSet(e, showingList))}
      >
        <FeatherIcon size={12} icon="share" />
      </button>
      {showingList && (
        <div className="sharethis__dropdown">
          <h5>Share this site on...</h5>
          <ul className="sharethis__options">
            {shareLinkTypesList.map((link, index) => (
              <ShareLink
                key={`share_${index}`}
                socialMediaType={link.name}
                currentRoute={currentRoute}
                shareLinkUrl={link.url}
                {...link}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ShareThis;
