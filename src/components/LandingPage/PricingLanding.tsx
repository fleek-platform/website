import React from 'react';
import { Container } from './Container';
import { Text } from './Text';
import { PricingPlanHero } from '@components/Pricing/PricingPlanHero';

const PricingLanding: React.FC = () => {
  return (
    <Container
      gradient="right"
      classNameOuterContainer="sm:pt-[72px] sm:pb-[105px]"
    >
      <div className="pb-44 text-center">
        <Text as="h3">Best pricing. Period.</Text>
      </div>
      <PricingPlanHero />
    </Container>
  );
};

export default PricingLanding;
