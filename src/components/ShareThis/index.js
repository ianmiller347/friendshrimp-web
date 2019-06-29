import React, { Component } from 'react';
import FeatherIcon from 'feather-icons-react';
import ShareLink from './ShareLink';

import './style.css';

const shareLinkTypesList = [
  {
    name: 'facebook',
    url: 'https://www.facebook.com/sharer/sharer.php?u=',
  },
  {
    name: 'twitter',
    url: 'https://twitter.com/home?status=Friendshrimps+are+for+friends',
  },
  {
    name: 'pinterest',
    url: 'https://pinterest.com/pin/create/button/?media=&description=&url=',
  },
  {
    name: 'linkedin',
    url: 'https://www.linkedin.com/shareArticle?mini=true&title=Friendshrimp&summary=&source=&url=',
  },
  {
    name: 'email',
    url: 'mailto:?subject=Lol+Friendshrimp+Site',
  },
];

class ShareThis extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showingList: false,
    };
  }

  toggleList = (e) => {
    e.stopPropagation();
    this.setState((prevState) => ({
      showingList: !prevState.showingList,
    }));
  }

  render() {
    const { currentRoute } = this.props;

    return (
      <div className="sharethis-container">
        <button className="sharethis__toggle" onClick={e => this.toggleList(e)}>
          <FeatherIcon icon="share" />
        </button>
        {this.state.showingList &&
          <ul className="sharethis__options">
            {shareLinkTypesList.map((link, index) => (
              <ShareLink 
                key={`share_${index}`}
                socialMediaType={link.name}
                currentRoute={currentRoute}
                shareLinkUrl={link.url}
              />
            ))}
          </ul>
        }
      </div>
    )
  }
}

export default ShareThis;
