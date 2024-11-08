import React, { useEffect, useState } from 'react';

import 'lite-youtube-embed/src/lite-yt-embed.css';

interface ILiteYouTubeProps {
  videoId: string;
  title?: string;
}
const LiteYouTube: React.FC<ILiteYouTubeProps> = ({
  videoId,
  title = 'YouTube video',
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
      style={{ width: '100%', aspectRatio: '16/9' }}
      params="modestbranding=1&rel=0"
      title={title}
    ></lite-youtube>
  );
};

export default LiteYouTube;
