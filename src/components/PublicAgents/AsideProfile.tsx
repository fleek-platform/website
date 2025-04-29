import {
  PiChatCircleDotsBold,
  PiPhoneBold,
  PiStarFourBold,
  PiVideoCameraBold,
} from 'react-icons/pi';
import type { PublicAgent } from './config';
import { Button } from './ui/Button';

type AsideProfileProps = {
  agent: PublicAgent;
};

export const AsideProfile: React.FC<AsideProfileProps> = ({ agent }) => {
  const { name, about, image, category } = agent;

  return (
    <aside className="p-12 pl-0">
      <div className="flex h-full flex-col rounded-12 border border-neutral-6 bg-gray-dark-2">
        <div className="flex h-60 items-center justify-between border-b border-neutral-6 px-12">
          <div className="flex items-center gap-8 font-medium text-neutral-12">
            <PiStarFourBold className="size-16" />
            Influencer
          </div>
          <div className="flex h-24 items-center justify-center rounded-full border border-neutral-7 px-8 text-12 text-neutral-11">
            {category}
          </div>
        </div>
        <div className="flex flex-col gap-16 p-12">
          <img
            src={image}
            width={284}
            height={284}
            alt={name}
            className="aspect-1 rounded-16 object-cover"
          />
          <p className="text-center text-18 font-medium text-neutral-12">
            {name}
          </p>
          <div className="flex items-center gap-12 *:flex-1">
            <Button className="pointer-events-none h-[61px] select-none flex-col items-center justify-center gap-4 bg-gray-dark-3">
              <PiChatCircleDotsBold className="size-16" />
              Chat
            </Button>
            <Button className="pointer-events-none h-[61px] select-none flex-col items-center justify-center gap-4 border border-neutral-6 bg-transparent">
              <PiPhoneBold className="size-16" />
              Call
            </Button>
            <Button className="pointer-events-none h-[61px] select-none flex-col items-center justify-center gap-4 border border-neutral-6 bg-transparent">
              <PiVideoCameraBold className="size-16" />
              Video
            </Button>
          </div>
          <div className="flex flex-col gap-8">
            <p>About me</p>
            <p className="leading-20 text-neutral-12">{about}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
