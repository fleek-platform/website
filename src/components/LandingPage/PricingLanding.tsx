import React, { useState } from 'react';
import { Container } from './Container';
import { Text } from './Text';
import { PricingPlanHero } from '@components/Pricing/PricingPlanHero';
import { TabbedButtons } from '@components/TabbedButtons';
import { Button } from '@components/Button';

const PricingLanding: React.FC = () => {
  const [priceFocus, setPriceFocus] = useState<'ai-agents' | 'hosting'>(
    'ai-agents',
  );

  return (
    <Container
      gradient="right"
      classNameOuterContainer="sm:pt-[72px] sm:pb-[105px]"
    >
      <div className="pb-44 text-center">
        <Text as="h3">Fair and transparent pricing</Text>

        <Text variant="description">
          {priceFocus === 'ai-agents'
            ? 'Create, manage and monetize AI agents using Fleek.'
            : "Create, deploy and manage your Web apps on Fleek's platform."}
        </Text>
      </div>
      <div className="mb-40 flex w-full justify-center gap-4">
        <TabbedButtons
          buttons={[
            <Button
              key="ai-agents"
              className="text-[1.4rem] sm:text-[1.9rem]"
              variant={
                priceFocus === 'ai-agents' ? 'primary-ghost' : 'secondary-ghost'
              }
              onClick={() => {
                setPriceFocus('ai-agents');
              }}
            >
              AI agent plans
            </Button>,
            <Button
              key="hosting"
              className="text-[1.4rem] sm:text-[1.9rem]"
              variant={
                priceFocus === 'hosting' ? 'primary-ghost' : 'secondary-ghost'
              }
              onClick={() => {
                setPriceFocus('hosting');
              }}
            >
              Hosting and storage plans
            </Button>,
          ]}
        />
      </div>
      <PricingPlanHero priceFocus={priceFocus} />
    </Container>
  );
};

export default PricingLanding;
