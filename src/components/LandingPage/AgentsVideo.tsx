import { useRef, useState } from 'react';
import { IoPauseCircle, IoPlayCircle } from 'react-icons/io5';
import { cn } from '@utils/cn';

export const AgentsVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    const video = videoRef.current;
    console.log(video?.paused);
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="rounded-xl group relative mx-auto my-100 max-w-[800px] overflow-hidden shadow-lg">
      {/* biome-ignore lint/a11y/useMediaCaption: <explanation> */}
      <video
        ref={videoRef}
        loop
        playsInline
        className="h-auto w-full rounded-8"
        poster="/images/landing-page/agents-video-preview.png"
      >
        <source src="/videos/landing/fleek_agents.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className={cn(isPlaying && 'hidden group-hover:block')}>
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>

        <button
          className="absolute left-1/2 top-1/2 z-10 size-100 -translate-x-1/2 -translate-y-1/2 rounded-full text-white transition-opacity hover:opacity-50"
          onClick={togglePlay}
        >
          {isPlaying ? (
            <IoPauseCircle className="size-full" />
          ) : (
            <IoPlayCircle className="size-full" />
          )}
        </button>
      </div>
    </div>
  );
};
