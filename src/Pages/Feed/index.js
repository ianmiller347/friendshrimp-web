import React, { useState, useEffect } from 'react';
import FeedList from './FeedList';
import './style.scss';

const Feed = () => {
  const [feedItems, setFeedItems] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch(`https://www.friendshrimp.com/get-feed`)
      .then(response => response.json())
      .then(data => {
        setLoading(false);
        setFeedItems(data.items);
      })
      .catch(error => {
        setLoading(false);
        setErrorMessage('Problem fetching friendshrimp feed :(');
        console.log(error);
      });
  }, []);

  console.log('isLoading', isLoading)
  console.log('feedItems', feedItems)

  return (
    <div className="friendshrimp-feed"> 
      <h2>so what is new</h2>
      <FeedList isLoading={isLoading} errorMessage={errorMessage} feedItems={feedItems} />
    </div>
  );
}

export default Feed;
