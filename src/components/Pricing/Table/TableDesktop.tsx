import { Fragment } from 'react';
import { PLAN_SECTIONS, PRICING_PLANS } from "./constants"
import TableCell from "./TableCell";
import TableHeader from "./TableHeader";
import './styles.module.css'
import clsx from "clsx";
import TableSubheader from "./TableSubheader";

import type { PlanKeys, SectionKey } from "./types";

const availablePlans = Object.keys(PRICING_PLANS);

const TableDesktop = () => (
 <table className="border-collapse w-full hidden lg:table" cellSpacing={0} cellPadding={0}>
    <thead>
      <tr>
        <th className="w-[20%]"/>
        {Object.values(PRICING_PLANS).map(({ header }, idx) => (
          <th key={`${idx}-${header.title}-th`} className="w-1/4">
            <TableHeader {...header} />
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {Object.entries(PLAN_SECTIONS).map(([section, { title, features: sectionFeatures, icon }], index) => (
        <Fragment key={index}>
          <tr>
            <td colSpan={4}>
              <TableSubheader icon={icon} title={title} className={clsx("justify-center border-1", {
                'rounded-tl-12': !index,
              })}/>
            </td>
          </tr>
          {Object.entries(sectionFeatures).map(([feature, featureTitle], index) => (
            <tr key={index}>
              <td><TableCell className="text-center">{featureTitle} </TableCell></td>
              {availablePlans.map((plan) => {
                const planFeatures = PRICING_PLANS[plan as PlanKeys].features[section as SectionKey];
                if (planFeatures.sharedPricing) {
                 if (index) {
                    return '';
                 }
                 return (
                    <td key={plan} rowSpan={Object.keys(sectionFeatures).length}>
                      <TableCell className="justify-center whitespace-pre-wrap">
                        {planFeatures.sharedPricing}
                      </TableCell>
                    </td>
                 )
                }
                return (
                 <td key={plan}>
                    <TableCell className="justify-center">
                      {planFeatures[feature]}
                    </TableCell>
                 </td>
                );
              })}
            </tr>
          ))}
        </Fragment>
      ))}
    </tbody>
 </table>
);

export default TableDesktop;
