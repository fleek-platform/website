import { PricingInfo } from '@base/content/pricing/config';
import { Button } from '@components/Button';
import { Text } from '@components/LandingPage/Text';
import PricingCard from '@components/PricingCard';

export const PricingPlanHero: React.FC = () => {
  return (
    <section className="flex flex-col text-left">
      <div className="flex flex-col gap-16">
        <div className="space-y-6">
          <Text variant="subtitle">AI agent plans</Text>
          <Text variant="paragraph">
            Create, deploy and manage agents with Fleek Machines. Contact us for
            custom pricing on swarms, platforms and larger projects.
          </Text>
        </div>
        <div className="grid gap-20 sm:grid-cols-3">
          <div className="flex flex-wrap items-center justify-between rounded-12 border border-gray-dark-6 bg-gray-dark-2 p-16 sm:col-span-1">
            <div>
              <Text variant="subtitle">Basic agent</Text>
              <Text variant="paragraph">Coming soon</Text>
            </div>
            <Text variant="subtitle">$10 / month</Text>
          </div>
          <div className="flex items-center justify-between rounded-12 border border-yellow-dark-11 bg-pro-pricing-card p-16 sm:col-span-2">
            <div>
              <Text variant="subtitle">TEE-enabled agent</Text>
              <Text variant="paragraph">
                Deploy within a Trusted Execution Environment (TEE)
              </Text>
            </div>
            <div className="flex flex-wrap items-center justify-end gap-16">
              <Text variant="subtitle">$20 / month</Text>
              <Button href="/agents">Create agent</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-6 pt-46">
        <Text variant="subtitle">Hosting and storage plans</Text>
        <Text variant="paragraph">
          Create, deploy and manage your Web apps on Fleek's platform.
        </Text>
      </div>
      <div className="mb-24 flex flex-col justify-between gap-20 pt-16 lg:flex-row">
        {PricingInfo.map((item, index) => {
          return <PricingCard key={index} {...item} />;
        })}
      </div>
    </section>
  );
};
