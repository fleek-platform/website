import clsx from 'clsx';
import TableCell from './TableCell';

type TableRowProps = {
  header: string;
  pricing: string | number;
};

const TableRow = ({ header, pricing }: TableRowProps) => (
  <div className="flex">
    <TableCell className="w-1/3 text-start lg:hidden">{header}</TableCell>
    <TableCell className="whitespace-wrap w-2/3 justify-center text-center lg:w-full">
      {pricing}
    </TableCell>
  </div>
);

export default TableRow;
