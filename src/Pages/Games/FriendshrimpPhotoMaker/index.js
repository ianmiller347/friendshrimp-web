import React from 'react';
import FeatherIcon from 'feather-icons-react';
import FriendshrimpPhoto from './FriendshrimpPhoto';
import './style.scss';

class FriendshrimpPhotoMaker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shrimpPhoto: '',
      shrimpPhotoAlt: null,
      shrimpNumber: 1,
      shrimpUploadText: 'Select photo :)'
    };
  }

  handleInputPhotoOnChange = e => {
    const shrimpUrl = URL.createObjectURL(e.target.files[0]);
    const shrimpPhoto = shrimpUrl || '';
    // To prevent a memory leak call URL.revokeObjectURL(<previously_created_ objectUrl>) 
    // to remove the old image URL from the memoreee
    this.setState({
      shrimpPhoto,
      shrimpUploadText: 'Friendshrimping it!',
    });

    setTimeout(() => this.setState({ shrimpUploadText: 'New?' }), 1234);
  }

  render() {
    const {
      shrimpPhoto,
      shrimpPhotoAlt,
      shrimpNumber,
      shrimpUploadText,
    } = this.state;

    return (
      <div className="photo-maker">
        <form name="friendshrimp-photo-maker--form">
          <label 
            htmlFor="friendshrimp-photo-maker--upload" 
            className="friendshrimp-photo-maker--upload-label">
            <span className="friendshrimp-photo-maker--upload-label__text">
              {shrimpUploadText}
            </span>
            <FeatherIcon icon="upload-cloud" size={69} />
            <input 
              name="friendshrimp-photo-maker--upload" 
              id="friendshrimp-photo-maker--upload"
              className="friendshrimp-photo-maker--input"
              type="file"
              accept=".jpg, .jpeg, .png, .gif"
              onChange={this.handleInputPhotoOnChange}
              placeholder="Text"
              alt="Friendshrimp Photo Maker is a shrimp for friends photo" />
          </label>
          {
            shrimpPhoto &&
            <FriendshrimpPhoto 
              photo={shrimpPhoto} 
              alt={shrimpPhotoAlt}
              shrimpNumber={shrimpNumber} />
          }
        </form>
        <input 
          type="hidden"
          name="hidey-boy-shrimp" 
          value="heh you found me u sneaker hacker LOL :) i was hiding!" />
      </div>
    );
  }
}

export default FriendshrimpPhotoMaker;
