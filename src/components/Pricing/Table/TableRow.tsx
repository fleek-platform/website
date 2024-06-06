import clsx from 'clsx';
import TableCell from './TableCell';

type TableRowProps = {
  header: string;
  pricing: string | number | boolean;
  overage: string;
};

const TableRow = ({ header, pricing, overage }: TableRowProps) => (
  <div className="flex">
    <TableCell className="w-1/3 text-start font-plex-sans text-14 font-medium text-gray-dark-12 lg:hidden">
      {header}
      <br />
      <span className="text-left font-plex-sans text-12 font-normal text-gray-dark-11">
        {overage}
      </span>
    </TableCell>
    <TableCell className="whitespace-wrap w-2/3 justify-center text-center lg:w-full">
      {pricing !== true && pricing !== false ? pricing : ''}
      {pricing === false ? <img src="/images/deny.png" alt="available" /> : ''}
      {pricing === true ? <img src="/images/check.png" alt="available" /> : ''}
    </TableCell>
  </div>
);

export default TableRow;
