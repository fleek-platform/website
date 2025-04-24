import { Text } from './Text';
import { Badge } from './Badge';
import { Button } from '../Button';
import { IoMenu, IoChatbubbleEllipses, IoPencil } from 'react-icons/io5';
import { FaInstagram, FaTiktok, FaX, FaXTwitter } from 'react-icons/fa6';
import { cn } from '@utils/cn';

export const Content = () => {
  return (
    <div className="mx-auto flex w-full flex-col items-center py-48 text-center sm:py-[75px]">
      <Badge>
        <span>📝</span> Content
      </Badge>
      <Text className="max-w-[600px] pt-24 font-inter text-[38px] font-normal leading-none">
        Automated content creation for your social media posts
      </Text>
      <p className="mt-24 max-w-[600px] text-18 text-neutral-11">
        Stop stressing over what to post, get fresh content every day, including
        viral ideas for the hottest trends in your influencer niche.
      </p>

      <Post
        className="mt-48"
        content="blessed to have this life, excited for the gig tonight at Big Bungalow"
        image="/images/landing-page/content-post-video.png"
      />
      <Post
        className="mt-24"
        content="Ibiza was a good time - ty"
        image="/images/landing-page/content-post-video-2.png"
      />
    </div>
  );
};

const Post = ({
  className,
  content,
  image,
}: {
  className?: string;
  content: string;
  image: string;
}) => {
  return (
    <div
      className={cn(
        'w-full max-w-[800px] rounded-8 border border-gray-dark-6 bg-gray-dark-2 text-start',
        className,
      )}
    >
      <div className="flex flex-row gap-12 p-12">
        <div className="flex-1">
          <div className="flex flex-row items-center gap-12">
            <img
              src="/images/landing-page/dj-slime-avatar.png"
              alt="DJ Slime post video"
              className="size-38"
            />
            <p className="text-16 font-medium text-white">DJ Slime</p>
          </div>

          <p className="mt-12 text-16 text-white">{content}</p>
        </div>

        <div>
          <img src={image} alt="DJ Slime avatar" className="size-[125px]" />
        </div>
      </div>

      <div className="flex flex-row gap-8 border-t border-gray-dark-6 p-12">
        <Button
          variant="secondary-ghost"
          className="pointer-events-none size-32 select-none rounded-[8px] p-0"
          size="sm"
        >
          <IoMenu className="size-16" />
        </Button>

        <Button
          variant="secondary-ghost"
          className="pointer-events-none size-32 select-none rounded-[8px] p-0"
          size="sm"
        >
          <IoChatbubbleEllipses className="size-16" />
        </Button>
        <Button
          variant="secondary-ghost"
          className="pointer-events-none size-32 select-none rounded-[8px] p-0"
          size="sm"
        >
          <IoPencil className="size-16" />
        </Button>

        <Button
          variant="secondary-ghost"
          className="pointer-events-none ml-auto select-none rounded-[8px]"
          size="sm"
        >
          <FaInstagram className="size-16" />
          Post to Instagram
        </Button>

        <Button
          variant="secondary-ghost"
          className="pointer-events-none select-none rounded-[8px]"
          size="sm"
        >
          <FaXTwitter className="size-16" />
          Post to X
        </Button>

        <Button
          variant="secondary-ghost"
          className="pointer-events-none select-none rounded-[8px]"
          size="sm"
        >
          <FaTiktok className="size-16" />
          Post to TikTok
        </Button>

        <Button
          variant="secondary"
          className="pointer-events-none select-none rounded-[8px]"
          size="sm"
        >
          Post to all
        </Button>
      </div>
    </div>
  );
};
