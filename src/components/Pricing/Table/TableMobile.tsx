import TableHeader from './TableHeader';
import PricingPlanSection from './PricingPlanSection';
import { PLAN_SECTIONS, PRICING_PLANS } from './constants';

import type { SectionKey } from './types';

export default function TableMobile() {
  return (
    <div className="flex w-full flex-col text-left lg:hidden">
      {Object.values(PRICING_PLANS).map(({ features, header }) => (
        <div key={header.title} className="mb-30 flex w-full flex-col lg:mb-0">
          <TableHeader {...header} />
          {Object.entries(features).map(([section, features], index) => (
            <PricingPlanSection
              key={index}
              section={PLAN_SECTIONS[section as SectionKey]}
              planFeatures={features}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
