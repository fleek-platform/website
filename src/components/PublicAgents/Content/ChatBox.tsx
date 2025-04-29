import type React from 'react';
import { Button, IconButton } from '../ui/Button';
import {
  PiArrowUpBold,
  PiImageBold,
  PiMagicWandBold,
  PiPlusBold,
  PiSlidersHorizontalBold,
  PiVideoBold,
} from 'react-icons/pi';

export const ChatBox: React.FC = () => {
  return (
    <div className="p-12">
      <div className="overflow-clip rounded-12 border border-neutral-6 bg-gray-dark-4">
        <textarea
          placeholder="Message..."
          className="w-full resize-none bg-transparent p-16 text-neutral-12 outline-none placeholder:text-neutral-8"
          // biome-ignore lint/a11y/noAutofocus: static page
          autoFocus
        />
        <div className="flex items-center justify-between p-12">
          <div className="flex items-center gap-8">
            <IconButton>
              <PiPlusBold className="size-16" />
            </IconButton>
            <IconButton>
              <PiSlidersHorizontalBold className="size-16" />
            </IconButton>
            <IconButton>
              <PiMagicWandBold className="size-16" />
            </IconButton>
          </div>
          <IconButton className="border-none bg-neutral-1 hover:bg-black">
            <PiArrowUpBold />
          </IconButton>
        </div>
        <div className="flex items-center gap-8 bg-gray-dark-3 p-12">
          <Button className="border border-neutral-6">
            <PiImageBold className="size-16 text-[#75C7F0]" /> Create image
          </Button>
          <Button className="border border-neutral-6">
            <PiVideoBold className="size-16 text-[#FF949D]" />
            Create video
          </Button>
        </div>
      </div>
    </div>
  );
};
