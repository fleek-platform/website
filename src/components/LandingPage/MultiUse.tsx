import { Button } from '@components/Button';
import {
  IoBrowsers,
  IoChatbubbleEllipses,
  IoLogoDiscord,
  IoLogoSlack,
} from 'react-icons/io5';
import 'keen-slider/keen-slider.min.css';
import { Badge } from './Badge';
import { Text } from './Text';

export const MultiUse = () => {
  return (
    <div className="flex flex-col items-center px-24 py-100 text-center">
      <Badge>
        <IoBrowsers className="size-16" />
        Multi-use
      </Badge>
      <Text className="max-w-[600px] pt-24">
        <span className="text-yellow">Connect with your agent</span>{' '}
        effortlessly from anywhere
      </Text>
      <p className="mt-24 max-w-[600px] text-18 text-neutral-11">
        We streamline sharing your agent experience on platforms like your
        website, Discord, and Slack.
      </p>

      <div className="mt-24 flex gap-8">
        <Button variant="secondary" size="sm">
          <IoChatbubbleEllipses className="mr-2 size-16" />
          Chat Embed
        </Button>
        <Button variant="secondary" size="sm">
          <IoLogoDiscord className="mr-2 size-16" />
          Discord
        </Button>
        <Button variant="secondary" size="sm">
          <IoLogoSlack className="mr-2 size-16" />
          Slack
        </Button>
      </div>

      <div className="neutral-1 mt-56 grid w-full max-w-[800px] place-content-center rounded-10 border border-neutral-6 bg-neutral-1 bg-[radial-gradient(#2e2e2e_1px,transparent_1px)] bg-[length:24px_24px] p-8 py-40">
        <img
          src="/images/landing-page/agent-chat-widget.png"
          alt="Embed widget agent chat"
          width={265}
        />
      </div>
    </div>
  );
};
