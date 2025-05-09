import React from 'react';
import FeedListItem from './FeedListItem';

interface FeedItem {
  id: string;
  title: string;
  content: string;
  url: string;
}

interface FeedListProps {
  feedItems: FeedItem[];
  isLoading: boolean;
  errorMessage?: string;
}

const FeedList: React.FC<FeedListProps> = ({
  feedItems,
  isLoading,
  errorMessage,
}) => {
  if (isLoading) {
    return <div className="loader">Refreshing friendshrimp feed...</div>;
  }

  if (errorMessage) {
    return <div className="error error-container">{errorMessage}</div>;
  }

  if (feedItems) {
    return (
      <ul className="feed__list">
        {feedItems.map((item) => (
          <FeedListItem key={item.id} item={item} />
        ))}
      </ul>
    );
  }

  return null;
};

export default FeedList;
