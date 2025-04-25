import { useRef, useState } from 'react';
import LiteYouTube from '@components/LiteYoutube/LiteYoutube';

export const AgentsVideo = () => {
  return (
    <div className="mx-auto my-100 w-full max-w-[800px] px-24 md:px-0">
      <div className="flex justify-center shadow-lg">
        <LiteYouTube
          videoId="kvQHgA4LJ5U"
          title="Fleek: Create AI agents and influencers"
          style={{
            borderRadius: '8px',
            backgroundImage:
              'url(/images/landing-page/agents-video-preview.png)',
          }}
        />
      </div>
    </div>
  );
};
