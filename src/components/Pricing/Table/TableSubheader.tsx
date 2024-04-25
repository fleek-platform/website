import Text from '@components/Text';
import clsx from 'clsx';

import type { PropsWithChildren } from 'react';

// TODO: Check type as original is next/image
type StaticImageData = string;

type TableSubheaderProps = PropsWithChildren & {
  icon: StaticImageData;
  title: string;
  className?: string;
};

const TableSubheader = ({ icon, title, className }: TableSubheaderProps) => (
  <div
    className={clsx(
      'flex h-52 w-full items-center justify-between border-x-2 border-y-1 border-ui-dark-grey bg-black p-12',
      className,
    )}
  >
    <div className="flex w-full items-center">
      <img src={icon} alt={'Storage'} className="mr-16 h-24 w-24" />
      <Text style="caption-m" className="text-ui-white">
        {title}
      </Text>
    </div>
  </div>
);

export default TableSubheader;
