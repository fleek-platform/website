import React from 'react';
import { PricingInfo } from '../content/pricing/config';
import PricingCard from './PricingCard';
import { Container } from './LandingPage/Container/Container';
import { Text } from './LandingPage/Text/Text';

const PricingLanding: React.FC = () => {
  return (
    <Container
      gradient="right"
      classNameOuterContainer="sm:pt-[72px] sm:pb-[105px]"
    >
      <div className="text-center">
        <Text as="h3">Best pricing. Period.</Text>
        <div className="mt-44 flex flex-col justify-center gap-20 lg:flex-row">
          {PricingInfo.map((item, index) => {
            return (
              <PricingCard
                key={index}
                title={item.title}
                description={item.description}
                features={item.features}
                cta={item.cta}
                cost={item.cost}
                variant={item.variant}
                url={item.url}
              />
            );
          })}
        </div>
      </div>
    </Container>
  );
};

export default PricingLanding;
