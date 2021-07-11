import React from 'react';
import FeedListItem from './FeedListItem';

const FeedList = ({ feedItems, isLoading, errorMessage }) => {
  if (isLoading) {
    return (
      <div className="loader">
        Refreshing friendshrimp feed...
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="error error-container">
        {errorMessage}
      </div>
    );
  }

  if (feedItems) {
    return (
      <ul className="feed__list">
        {feedItems.map(item => (
          <FeedListItem key={item.id} item={item} />
        ))}
      </ul>
    );
  }

  return null;
};

export default FeedList;
