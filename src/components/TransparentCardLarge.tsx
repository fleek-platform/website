import type { PropsWithChildren } from 'react';
import Text from './Text';

type TransparentCardLargeProps = PropsWithChildren & {
  title: string;
};

const TransparentCardLarge = ({
  title,
  children,
}: TransparentCardLargeProps) => (
  <div className="flex w-full flex-col gap-48 rounded-24 bg-black-transparent px-16 py-24 shadow-dark lg:max-w-[340px]">
    <Text className="text-center">{title}</Text>
    {children}
  </div>
);

export default TransparentCardLarge;
