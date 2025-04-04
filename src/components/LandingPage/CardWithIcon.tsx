import type { IconType } from 'react-icons/lib';

export const CardWithIcon = ({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: IconType;
}) => {
  const IconComp = icon;
  return (
    <div className="relative flex flex-col overflow-hidden rounded-8 border border-neutral-6 bg-neutral-1 p-12 text-left">
      <IconComp className="absolute -top-14 right-0 size-76 text-neutral-2" />
      <IconComp className="size-34" />
      <p className="mt-12 text-18 font-bold text-neutral-12">{title}</p>
      <p className="mt-4">{description}</p>
    </div>
  );
};
