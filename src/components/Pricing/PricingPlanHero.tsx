import {
  HostingPricingInfo,
  AiAgentsPricingInfo,
} from '@base/content/pricing/config';
import { Text } from '@components/LandingPage/Text';
import PricingCard from '@components/PricingCard';

interface PricingPlanHeroParams {
  priceFocus?: 'ai-agents' | 'hosting';
}

export const PricingPlanHero: React.FC<PricingPlanHeroParams> = ({
  priceFocus,
}) => {
  return (
    <section className="flex flex-col text-left">
      {priceFocus === 'ai-agents' && (
        <div className="flex flex-col gap-16">
          <div className="mb-24 flex flex-col justify-between gap-20 pt-16 lg:flex-row">
            {AiAgentsPricingInfo.map((item) => {
              return <PricingCard key={item.title} {...item} />;
            })}
          </div>
        </div>
      )}

      {priceFocus === 'hosting' && (
        <div className="flex flex-col gap-16">
          <div className="mb-24 flex flex-col justify-between gap-20 pt-16 lg:flex-row">
            {HostingPricingInfo.map((item) => {
              return <PricingCard key={item.title} {...item} />;
            })}
          </div>
        </div>
      )}
    </section>
  );
};
