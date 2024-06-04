import { Fragment } from 'react';
import { PLAN_SECTIONS, PRICING_PLANS } from './constants';
import TableCell from './TableCell';
import TableHeader from './TableHeader';
import './styles.module.css';
import clsx from 'clsx';
import TableSubheader from './TableSubheader';

import type { PlanKeys, SectionKey } from './types';

const availablePlans = Object.keys(PRICING_PLANS);

const TableDesktop = () => (
  <table
    className="hidden w-full border-collapse lg:table lg:rounded-br-12"
    cellSpacing={0}
    cellPadding={0}
  >
    <thead>
      <tr className="border-b-1 border-ui-mid-grey">
        <th className="w-[20%]">
          <div className=" flex h-full w-full flex-col gap-16  rounded-tl-12  border-1 border-b-0 border-ui-mid-grey  px-20 py-20 lg:max-w-[345px]">
            <h3 className="typo-m-normal text-left">Plan Breakdown</h3>
            <p className="typo-s text-left">
              Explore the different plans we have and how they compare.
            </p>
          </div>
        </th>
        {Object.values(PRICING_PLANS).map(({ header }, idx) => (
          <th key={`${idx}-${header.title}-th`} className="w-1/4">
            <TableHeader {...header} />
          </th>
        ))}
      </tr>
    </thead>
    <tbody className="rounded-b-12">
      {Object.entries(PLAN_SECTIONS).map(
        (
          [section, { title, features: sectionFeatures, icon, overage }],
          index,
        ) => (
          <Fragment key={index}>
            <tr>
              <td colSpan={4}>
                <TableSubheader
                  icon={icon}
                  title={title}
                  className={clsx('border-collapse justify-center border-1', {
                    '': !index,
                  })}
                />
              </td>
            </tr>
            {Object.entries(sectionFeatures).map(
              ([feature, featureTitle], index) => (
                <tr key={index} className="rounded-12">
                  <td>
                    <TableCell
                      className={`text-center ${featureTitle === 'Function Request' ? 'rounded-bl-12' : ''}`}
                    >
                      <div className="text-left font-plex-sans text-14 font-medium text-gray-dark-12">
                        {featureTitle}{' '}
                      </div>
                      <div className="text-left font-plex-sans text-12 font-normal text-gray-dark-11">
                        {overage[index]}
                      </div>
                    </TableCell>
                  </td>
                  {availablePlans.map((plan) => {
                    const planFeatures =
                      PRICING_PLANS[plan as PlanKeys].features[
                        section as SectionKey
                      ];
                    if (planFeatures.sharedPricing) {
                      if (index) {
                        return '';
                      }
                      return (
                        <td
                          key={plan}
                          rowSpan={Object.keys(sectionFeatures).length}
                        >
                          <TableCell className="justify-center whitespace-pre-wrap">
                            {planFeatures.sharedPricing}
                          </TableCell>
                        </td>
                      );
                    }
                    return (
                      <td key={plan}>
                        <TableCell
                          className={`justify-start ${planFeatures[feature] === 'Custom ' ? 'rounded-br-12' : ''}`}
                        >
                          {planFeatures[feature] !== true ? (
                            planFeatures[feature]
                          ) : (
                            <img src="/svg/check.svg" alt="available" />
                          )}
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

export default TableDesktop;
