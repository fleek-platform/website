import type React from 'react';
import { Container } from './Container';
import { Text } from './Text';
import { PricingPlanHero } from '@components/Pricing/PricingPlanHero';

const PricingLanding: React.FC = () => {
  return (
    <Container
      classNameOuterContainer="sm:pt-[75px] sm:pb-[51px] border-none"
      gradient="none"
    >
      <div className="pb-44 text-center">
        <Text
          as="h3"
          className="font-inter text-[38px] font-normal leading-none"
        >
          AI Agent Plans
        </Text>

        <Text variant="description" className="mt-24 font-inter font-normal">
          Create, manage and monetize AI agents using Fleek.
        </Text>
      </div>
      <PricingPlanHero priceFocus="ai-agents" />
    </Container>
  );
};

export default PricingLanding;
