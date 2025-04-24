import {
  IoLockClosed,
  IoLockClosedOutline,
  IoLockClosedSharp,
} from 'react-icons/io5';
import { Badge } from './Badge';
import { Text } from './Text';

export const Earn = () => {
  return (
    <div className="mx-auto flex flex-col items-center py-48 text-center sm:py-[75px]">
      <Badge>
        <span>🤑</span> Earn
      </Badge>
      <Text className="max-w-[600px] pt-24 font-inter text-[38px] font-normal leading-none">
        Unlock your potential and make money with your agent
      </Text>
      <p className="mt-24 max-w-[600px] text-18 text-neutral-11">
        Your agent can showcase products from various brands, share exclusive
        subscription-only content, and much more.
      </p>
      <div className="grid gap-24 pt-48 lg:grid-cols-2">
        <div className="flex flex-col gap-24 rounded-8 border border-neutral-6 bg-neutral-2 p-24">
          <div className="space-y-18">
            <span className="text-34">📢</span>
            <Text variant="subtitle" className="font-inter font-medium">
              Sponsored partnerships with brands
            </Text>
          </div>
          <img
            src="/images/landing-page/earn/sponsored.png"
            alt="Chat with agent"
            className="size-[340px] rounded-8"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col gap-24 rounded-8 border border-neutral-6 bg-neutral-2 p-24">
          <div className="space-y-18">
            <span className="text-34">😏</span>
            <Text variant="subtitle" className="font-inter font-medium">
              Exclusive content only for subscribers
            </Text>
          </div>
          <div className="relative">
            <img
              src="/images/landing-page/earn/nsfw.png"
              alt="Chat with agent"
              className="z-0 size-[340px] rounded-8"
              loading="lazy"
            />
            <div className="absolute inset-0 z-1 bg-gradient-to-b from-transparent via-black/50 to-black" />
            <div className="absolute inset-0 z-10 flex flex-col justify-between p-24">
              <div className="mx-auto rounded-full border border-white px-12 py-8 font-inter text-14 font-medium text-white">
                18+ NSFW
              </div>
              <div className="mx-auto flex flex-col items-center">
                <IoLockClosed className="size-52 text-white" />
                <Text variant="subtitle" className="font-inter font-medium">
                  Locked content
                </Text>
              </div>
              <button
                type="button"
                className="flex w-full cursor-not-allowed items-center justify-center gap-6 rounded-8 bg-white p-8 font-medium text-black"
              >
                Pay $5 to unlock
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
