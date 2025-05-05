import { PiChatCircleDotsBold } from 'react-icons/pi';
import { Badge } from './Badge';
import { Text } from './Text';
import {
  publicAgents,
  type PublicAgent,
} from '@components/PublicAgents/config';

export const Templates = () => {
  return (
    <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center px-24 py-48 text-center sm:py-[75px]">
      <Badge>
        <span>🌎</span> Explore
      </Badge>
      <Text
        variant="subtitle"
        className="max-w-[600px] pt-24 font-inter text-[38px] font-normal leading-none"
      >
        Who do you want to chat with?
      </Text>
      <p className="mt-24 text-18 text-neutral-11">
        Explore social agents and start chatting.
      </p>

      <div className="grid w-full max-w-[800px] gap-12 pt-40 sm:grid-cols-2 md:grid-cols-3">
        {publicAgents.map((template) => (
          <div key={template.id}>
            <TemplateCard template={template} />
          </div>
        ))}
      </div>
    </div>
  );
};

export const TemplateCard = ({ template }: { template: PublicAgent }) => (
  <a
    href={`preview/${template.id}`}
    className="group relative flex h-[460px] flex-col justify-between overflow-clip rounded-16 border border-neutral-6"
  >
    <img
      src={template.image}
      alt={template.name}
      className="absolute inset-0 -z-1 min-w-[259px] w-full h-[460px] object-cover transition-all group-hover:scale-[1.02] group-hover:opacity-80"
      loading="lazy"
    />
    <div className="mr-auto flex w-full items-start justify-between p-12">
      <div>
        <div className="flex h-24 items-center justify-center rounded-full bg-black/60 px-8 font-medium text-neutral-12">
          {template.category}
        </div>
      </div>
    </div>
    <div className="flex flex-col items-start gap-16 bg-gradient-to-b from-transparent via-black/80 to-black p-12">
      <div className="space-y-4 text-left">
        <p className="text-20 font-bold leading-20 text-neutral-12">
          {template.name}
        </p>
        <p className="leading-18 text-neutral-12">{template.about}</p>
      </div>
      <button
        type="button"
        className="flex h-36 w-full items-center justify-center gap-8 rounded-12 bg-neutral-12 font-medium text-gray-dark-1 transition-colors group-hover:bg-neutral-11"
      >
        <PiChatCircleDotsBold className="size-16" /> Chat
      </button>
    </div>
  </a>
);
