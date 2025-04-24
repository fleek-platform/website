import type React from 'react';
import { useState } from 'react';
import { Container } from './Container';
import { Text } from './Text';
import { PricingPlanHero } from '@components/Pricing/PricingPlanHero';

const PricingLanding: React.FC = () => {
  const [priceFocus, setPriceFocus] = useState<'ai-agents' | 'hosting'>(
    'ai-agents',
  );

  return (
    <Container
      gradient="right"
      classNameOuterContainer="sm:pt-[75px] sm:pb-[51px]"
    >
      <div className="pb-44 text-center">
        <Text
          as="h3"
          className="font-inter text-[38px] font-normal leading-none"
        >
          AI Agent Plans
        </Text>

        <Text variant="description" className="mt-24 font-normal">
          {priceFocus === 'ai-agents'
            ? 'Create, manage and monetize AI agents using Fleek.'
            : "Create, deploy and manage your Web apps on Fleek's platform."}
        </Text>
      </div>
      <PricingPlanHero priceFocus="ai-agents" />
    </Container>
  );
};

export default PricingLanding;
