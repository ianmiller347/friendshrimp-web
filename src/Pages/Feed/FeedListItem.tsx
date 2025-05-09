import React, { useEffect, useRef } from 'react';
import FeatherIcon from 'feather-icons-react';
import { useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

interface FeedItem {
  id: string;
  title: string;
  content: string;
  url: string;
}

interface FeedListItemProps {
  item: FeedItem;
}

const getPathFromBloggerUrl = (url: string): string => {
  // convert "http://friendshrimp.blogspot.com/2021/06/can-shrimp-fry-rice.html"
  // into /2021-06-can-shrimp-fry-rice
  // make it into url object and take path
  const urlObject = new URL(url);
  const { pathname } = urlObject;
  return pathname.substring(1).replace(/[/]/g, '-').replace('.html', '');
};

const FeedListItem: React.FC<FeedListItemProps> = ({ item }) => {
  const itemRef = useRef<HTMLLIElement>(null);
  const location = useLocation();
  const executeScroll = () => itemRef.current?.scrollIntoView();
  const itemHash = getPathFromBloggerUrl(item.url);

  useEffect(() => {
    if (location.hash === `#${itemHash}`) {
      executeScroll();
    }
  }, []);

  return (
    <li className="feed__item" id={itemHash} ref={itemRef}>
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
