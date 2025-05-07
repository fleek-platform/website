import type React from 'react';
import { Button, IconButton } from '../Button';
import {
  PiArrowUpBold,
  PiCircleNotchBold,
  PiImageBold,
  PiMagicWandBold,
  PiPlusBold,
  PiSlidersHorizontalBold,
  PiVideoBold,
} from 'react-icons/pi';
import { useState } from 'react';
import { PreviewModeTooltip } from '../Tooltip';

type ChatBoxProps = {
  isLoading: boolean;
  hasClosed: boolean;
  onMsgSubmit: (msg: string) => void;
  openModal: () => void;
};

export const ChatBox: React.FC<ChatBoxProps> = ({
  isLoading,
  hasClosed,
  onMsgSubmit,
  openModal,
}) => {
  const [msg, setMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setMsg(e.target.value);

  const handleSubmit = () => {
    onMsgSubmit(msg);
    setMsg('');
  };

  return (
    <div className="flex flex-col gap-12 p-12">
      {hasClosed && (
        <div className="flex items-center justify-between rounded-16 border border-neutral-6 bg-gray-dark-4 p-12 text-neutral-12">
          Kick off your 7-day free trial on the Fan Plan and keep the convo
          going!{' '}
          <Button
            className="bg-neutral-12 text-gray-dark-1 hover:bg-white active:bg-neutral-12"
            onClick={openModal}
          >
            Start 7-day free trial
          </Button>
        </div>
      )}
      <div className="relative overflow-clip rounded-12 border border-neutral-7 bg-gray-dark-4">
        {hasClosed && (
          <div className="absolute inset-0 z-10 cursor-not-allowed bg-gray-dark-3/50" />
        )}
        <textarea
          placeholder="Message..."
          className="w-full resize-none bg-transparent p-12 text-neutral-12 outline-none [field-sizing:content] placeholder:text-neutral-8"
          value={msg}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();

              if (isLoading) return;

              handleSubmit();
            }
          }}
          // biome-ignore lint/a11y/noAutofocus: static page
          autoFocus
        />
        <div className="flex items-center justify-between p-12">
          <div className="flex items-center gap-8">
            <PreviewModeTooltip align="start" className="-top-34">
              <IconButton className="pointer-events-none select-none">
                <PiPlusBold className="size-16" />
              </IconButton>
            </PreviewModeTooltip>
            <PreviewModeTooltip align="start" className="-top-34">
              <IconButton className="pointer-events-none select-none">
                <PiSlidersHorizontalBold className="size-16" />
              </IconButton>
            </PreviewModeTooltip>
            <PreviewModeTooltip align="start" className="-top-34">
              <IconButton className="pointer-events-none select-none">
                <PiMagicWandBold className="size-16" />
              </IconButton>
            </PreviewModeTooltip>
          </div>
          <IconButton
            className="border-none bg-white text-gray-dark-1 hover:bg-gray-dark-11 disabled:bg-gray-dark-3 disabled:text-gray-dark-11"
            onClick={handleSubmit}
            disabled={!msg || isLoading}
          >
            {isLoading ? (
              <PiCircleNotchBold className="size-16 animate-spin" />
            ) : (
              <PiArrowUpBold className="size-16" />
            )}
          </IconButton>
        </div>
        <div className="flex items-center gap-8 bg-gray-dark-3 p-12">
          <PreviewModeTooltip align="start" className="-top-34">
            <Button className="pointer-events-none select-none border border-neutral-6">
              <PiImageBold className="size-16 text-[#75C7F0]" /> Create image
            </Button>
          </PreviewModeTooltip>
          <PreviewModeTooltip align="start" className="-top-34">
            <Button className="pointer-events-none select-none border border-neutral-6">
              <PiVideoBold className="size-16 text-[#FF949D]" />
              Create video
            </Button>
          </PreviewModeTooltip>
        </div>
      </div>
    </div>
  );
};
