import TableSubheader from './TableSubheader';
import TableRow from './TableRow';
import MergedTableRows from './MergedTableRow';

import type { FeaturePricing } from './types';

// TODO: check type as original is next/image
type StaticImageData = string;

export type PricingPlanSectionProps = {
  section: {
    icon: StaticImageData;
    title: string;
    features: Record<string, string>;
  };
  planFeatures: FeaturePricing;
};

const PricingPlanSection = ({
  section,
  planFeatures,
}: PricingPlanSectionProps) => (
  <>
    <TableSubheader icon={section.icon} title={section.title} />
    <div className="flex flex-col">
      {planFeatures.sharedPricing ? (
        <MergedTableRows
          headers={Object.values(section.features)}
          features={planFeatures}
        />
      ) : (
        Object.keys(section.features).map((featureKey, index) => (
          <TableRow
            key={index}
            header={section.features[featureKey]}
            pricing={planFeatures[featureKey]}
          />
        ))
      )}
    </div>
  </>
);

export default PricingPlanSection;
