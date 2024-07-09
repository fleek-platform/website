import TableCell from '@components/Pricing/Table/TableCell';
import TableHeader from '@components/Pricing/Table/TableHeader';
import TableSubheader from '@components/Pricing/Table/TableSubheader';
import { Fragment } from 'react';
import clsx from 'clsx';
import { PERMISSIONS_ROLES, PERMISSIONS_SECTIONS } from './constants';
import type { FeatureKeys, RolesKeys, SectionKeys } from './types';

const roles = Object.keys(PERMISSIONS_ROLES);

const PermissionsTable: React.FC = () => {
  return (
    <table
      className="hidden w-full border-collapse lg:table"
      cellSpacing={0}
      cellPadding={0}
    >
      <thead>
        <tr>
          <th className="w-1/4">
            <div className=" flex h-full w-full flex-col gap-16  rounded-tl-12  border-1 border-b-0 border-ui-mid-grey  px-20 py-20 lg:max-w-[345px]"></div>
          </th>
          {Object.values(PERMISSIONS_ROLES).map(({ header }) => (
            <th>
              <div
                className={`flex h-full w-full flex-col items-center justify-between gap-16 ${header === 'Read Only' ? 'rounded-tr-12' : ''} border-1 border-b-0  border-ui-mid-grey  px-20 py-20 lg:max-w-[345px]`}
              >
                {header}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="rounded-b-12">
        {Object.entries(PERMISSIONS_SECTIONS).map(
          ([section, { title, features }], index) => (
            <Fragment key={index}>
              <tr>
                <td colSpan={5}>
                  <div
                    className={clsx(
                      'flex h-52 w-full items-center justify-between border-x-1 border-y-1 border-ui-mid-grey bg-gray-dark-1 p-12',
                    )}
                  >
                    <div className="flex w-full items-center">
                      <h4>{title}</h4>
                    </div>
                  </div>
                </td>
              </tr>
              {Object.entries(features).map(
                ([feature, featureTitle], index) => (
                  <tr>
                    <td>
                      <TableCell
                        className={`whitespace-pre-wrap ${feature === 'deleteMember' ? 'rounded-bl-12' : ''}`}
                      >
                        {featureTitle}
                      </TableCell>
                    </td>
                    {roles.map((role, index) => {
                      const rolePermissions =
                        PERMISSIONS_ROLES[role as RolesKeys].features[
                          section as SectionKeys
                        ];

                      return (
                        <td key={role}>
                          <TableCell
                            className={`justify-center whitespace-pre-wrap ${feature === 'deleteMember' && index === 3 ? 'rounded-br-12' : ''}`}
                          >
                            {rolePermissions[feature as keyof FeatureKeys]
                              ? '✅'
                              : '❌'}
                          </TableCell>
                        </td>
                      );
                    })}
                  </tr>
                ),
              )}
            </Fragment>
          ),
        )}
      </tbody>
    </table>
  );
};

export default PermissionsTable;
