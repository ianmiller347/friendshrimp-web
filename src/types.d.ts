declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.otf' {
  const content: string;
  export default content;
}

declare module '*.woff' {
  const content: string;
  export default content;
}

declare module '*.woff2' {
  const content: string;
  export default content;
}

declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}

declare module 'react-sound' {
  import { Component } from 'react';

  export interface SoundProps {
    url: string;
    playStatus: 'PLAYING' | 'STOPPED' | 'PAUSED';
    playFromPosition?: number;
    position?: number;
    volume?: number;
    playbackRate?: number;
    autoLoad?: boolean;
    loop?: boolean;
    onLoading?: () => void;
    onPlaying?: () => void;
    onFinishedPlaying?: () => void;
    onFinishedLoading?: () => void;
    onStop?: () => void;
    onPause?: () => void;
    onResume?: () => void;
    onBufferChange?: (buffer: number) => void;
    onVolumeChange?: (volume: number) => void;
    onPlaybackRateChange?: (playbackRate: number) => void;
  }

  export default class Sound extends Component<SoundProps> {}
}

declare module 'react-twitch-embed' {
  import { Component } from 'react';

  export interface TwitchEmbedProps {
    channel?: string;
    video?: string;
    collection?: string;
    parent?: string[];
    width?: string | number;
    height?: string | number;
    theme?: 'dark' | 'light';
    muted?: boolean;
    autoplay?: boolean;
    onVideoReady?: () => void;
    onVideoPlay?: () => void;
    onVideoPause?: () => void;
    onVideoEnd?: () => void;
  }

  export class TwitchEmbed extends Component<TwitchEmbedProps> {}
}

declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}

declare module '*.gif' {
  const content: string;
  export default content;
}

declare module '*.webp' {
  const content: string;
  export default content;
}

declare module '*.ttf' {
  const content: string;
  export default content;
}

declare module '*.eot' {
  const content: string;
  export default content;
}
