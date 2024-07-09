import Text from '@components/Text';
import clsx from 'clsx';

import type { PropsWithChildren } from 'react';

type TableCellProps = PropsWithChildren<{
  className?: string;
}>;

const TableCell = ({ children, className }: TableCellProps) => (
  <div
    className={clsx(
      className,
      'flex min-h-52 border-collapse items-center border border-ui-mid-grey bg-gray-dark-1 p-12 ',
    )}
  >
    <Text style="m">{children}</Text>
  </div>
);

export default TableCell;
