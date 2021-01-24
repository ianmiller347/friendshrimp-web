import React from 'react';

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
          <li className="feed__item" key={item.id}>
            <h3 className="item__title">{item.title}</h3>
            <div 
              className="item__content text-content"
              dangerouslySetInnerHTML={{ __html: item.content }} />
          </li>
        ))}
      </ul>
    );
  }

  return null;
};

export default FeedList;
