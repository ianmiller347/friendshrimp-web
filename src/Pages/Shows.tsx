import React from 'react';
import { TwitchEmbed } from 'react-twitch-embed';

const Shows: React.FC = () => {
  return (
    <>
      <h2>No live shows booked right now 😭</h2>
      <p>
        Instead check out friendshrimp on{' '}
        <a href="https://twitch.tv/friendshrimps">Twitch</a> or Spotify!
      </p>
      <div className="margin-bottom-s">
        <iframe
          src="https://open.spotify.com/embed/track/3fYSFITHV36HCLexVWaUJd"
          width="300"
          height="380"
          allow="encrypted-media"
        />
      </div>
      <div className="twitch">
        <TwitchEmbed channel="friendshrimps" theme="dark" muted />
      </div>
    </>
  );
};

export default Shows;
