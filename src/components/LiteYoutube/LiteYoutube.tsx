import React, { useEffect, useState, type CSSProperties } from 'react';

import 'lite-youtube-embed/src/lite-yt-embed.css';

interface ILiteYouTubeProps {
  videoId: string;
  title?: string;
  style?: CSSProperties;
}
const LiteYouTube: React.FC<ILiteYouTubeProps> = ({
  videoId,
  title = 'YouTube video',
  style = {},
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    import('lite-youtube-embed');
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <lite-youtube
      videoid={videoId}
      style={{ width: '100%', aspectRatio: '16/9', ...style }}
      params="modestbranding=1&rel=0"
      title={title}
    ></lite-youtube>
  );
};

export default LiteYouTube;
