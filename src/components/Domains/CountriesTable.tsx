import TableCell from '@components/Pricing/Table/TableCell';
import { Fragment } from 'react';
import clsx from 'clsx';
import { Headers, OFAC_COUNTRIES } from './constants';

const CountriesTable: React.FC = () => {
  return (
    <table
      className="hidden w-full border-collapse lg:table"
      cellSpacing={0}
      cellPadding={0}
    >
      <thead>
        <tr>
          {Headers.map((header) => (
            <th>
              <div
                className={`flex h-full w-full flex-col items-start justify-center gap-16 px-12 py-4  lg:max-w-[345px]`}
              >
                {header}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="rounded-b-12">
        {OFAC_COUNTRIES.map(({ country, countryCode }) => (
          <Fragment key={countryCode}>
            <tr>
              <td>
                <TableCell className={`justify-start whitespace-pre-wrap`}>
                  {country}
                </TableCell>
              </td>

              <td>
                <TableCell className={`justify-start whitespace-pre-wrap `}>
                  {countryCode}
                </TableCell>
              </td>
            </tr>
          </Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default CountriesTable;
