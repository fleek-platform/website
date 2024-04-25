import Text from '@components/Text';
import clsx from 'clsx';

import type { PlanHeader } from './types';

const TableHeader = ({
  title,
  titleClassName,
  subtitle,
  description,
  cta,
}: PlanHeader) => (
  <div className="flex h-full w-full flex-col items-center justify-between gap-16 rounded-t-28 border-1 border-b-0 border-ui-dark-grey bg-ui-black px-10 py-20 lg:max-w-[342px]">
    <Text style="h5" className={titleClassName}>
      {title}
    </Text>
    <Text style="xl" className="text-white">
      {subtitle}
    </Text>
    <Text
      style="s"
      className="whitespace-pre-wrap text-center text-ui-light-grey"
    >
      {description}
    </Text>
    <a
      href={cta.href}
      className={clsx('bg-opacity-4 rounded-13 bg-ui-white p-1', cta.className)}
      target="_blank"
      rel="noopener noreferrer"
    >
      <button className="flex items-center justify-center rounded-12 bg-ui-black px-32 py-16">
        <Text style="btn-s">{cta.text}</Text>
      </button>
    </a>
  </div>
);

export default TableHeader;
