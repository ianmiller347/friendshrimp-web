import React, { useEffect, useRef } from 'react';
import FeatherIcon from 'feather-icons-react';
import { useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

const getPathFromBloggerUrl = (url) => {
  // convert "http://friendshrimp.blogspot.com/2021/06/can-shrimp-fry-rice.html" 
  // into /2021-06-can-shrimp-fry-rice
  // make it into url object and take path
  const urlObject = new URL(url);
  const { pathname } = urlObject;
  return pathname.substring(1).replace(/[\/]/g,'-').replace('.html','');
}

// feed item = {
//     id: String,
//     title: String,
//     content: String,
//     url: String, // "http://friendshrimp.blogspot.com/2021/06/can-shrimp-fry-rice.html"
// }

const FeedListItem = ({ item }) => {
  const itemRef = useRef(null);
  const location = useLocation();
  const executeScroll = () => itemRef.current.scrollIntoView();
  const itemHash = getPathFromBloggerUrl(item.url);
  useEffect(() => {
    if (location.hash === `#${itemHash}`) {
      executeScroll();
    }
  }, []);

  return (
    <li
      className="feed__item"
      id={itemHash}
      ref={itemRef}
    >
      <h3 className="item__title">{item.title}</h3>
      <div 
        className="item__content text-content"
        dangerouslySetInnerHTML={{ __html: item.content }}
      />
      <div className="feed__item__footer">
        <HashLink smooth to={`/feed#${itemHash}`} title="permalink">
          <FeatherIcon icon="link" />
        </HashLink>
      </div>
    </li>
  );
};

export default FeedListItem;
