import { IoGrid } from 'react-icons/io5';
import { Badge } from './Badge';
import { Text } from './Text';

export const Features = () => {
  return (
    <div className="mx-auto hidden max-w-[800px] flex-col items-center py-48 text-center sm:flex sm:py-[75px]">
      <Badge>
        <span>💡</span>
        Features
      </Badge>
      <Text className="pt-24 font-plex-sans font-normal">
        Anything you can do, your virtual influencer can do better.
      </Text>

      <div className="flex gap-16 pt-48 text-start">
        <div className="flex flex-col overflow-hidden rounded-10 bg-gray-dark-2">
          <div className="mx-18 mb-auto mt-18">
            <p className="font-meidum text-18 text-neutral-12">
              Chat with your agent the way you want, about anything
            </p>
            <p className="mt-8 text-14 text-neutral-11">
              Either within the Fleek platform or any of the apps your agent is
              integrated with.
            </p>
          </div>
          <div className="ml-18 mt-18">
            <img
              src="/images/landing-page/agent-chat-demo-2.png"
              alt="Chat with agent"
            />
          </div>
        </div>

        <div className="flex flex-col rounded-10 bg-gray-dark-2 p-18">
          <div className="mb-20">
            <p className="text-18 font-medium text-neutral-12">
              Voice generation
            </p>
            <p className="mt-8 text-14 text-neutral-11">
              Get a custom voice model for your influencers.
            </p>
          </div>
          <div className="mt-auto">
            <img
              src="/images/landing-page/voice-generation.png"
              alt="Voice generation"
            />
          </div>
        </div>

        <div className="flex flex-col rounded-10 bg-gray-dark-2 p-18">
          <div className="mb-auto">
            <p className="text-18 font-medium text-neutral-12">
              Video generation
            </p>
            <p className="mt-8 text-14 text-neutral-11">
              Create engaging videos of your influencer.
            </p>
          </div>
          <div className="mt-14">
            <img
              src="/images/landing-page/video-generation.png"
              alt="Chat with agent"
              className="rounded-tl-10 bg-neutral-1"
            />
          </div>
        </div>
      </div>

      <div className="mt-16 flex gap-16 text-start">
        <div className="rounded-10 bg-gray-dark-2 p-18">
          <div className="mb-auto">
            <p className="text-18 font-medium text-neutral-12">
              Avatar Creation
            </p>
            <p className="mt-8 text-14 text-neutral-11">
              Fully customize the appearance of your agent.
            </p>
          </div>
          <div className="mt-24">
            <img
              src="/images/landing-page/avatar-creation.png"
              alt="Chat with agent"
            />
          </div>
        </div>

        <div className="flex flex-col rounded-10 bg-gray-dark-2 p-18">
          <div className="mb-auto">
            <p className="text-18 font-medium text-neutral-12">Unrestricted</p>
            <p className="mt-8 text-14 text-neutral-11">
              As free and expressive as human beings.
            </p>
          </div>
          <div className="-mx-8 -mb-8 mt-8">
            <img
              src="/images/landing-page/unrestricted.png"
              alt="Unrestricted"
            />
          </div>
        </div>

        <div className="flex flex-col rounded-10 bg-gray-dark-2">
          <div className="mx-18 mb-auto mt-18">
            <p className="text-18 font-medium text-neutral-12">
              Check out the key stats on how your agent is performing
            </p>
            <p className="mt-8 text-14 text-neutral-11">
              Analytics included with your agent.
            </p>
          </div>
          <div className="ml-18 mt-22">
            <img
              src="/images/landing-page/analytics.png"
              alt="Chat with agent"
              className="rounded-tl-10 bg-neutral-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
