import React from 'react';
import Container from './Container';
import PageSection from './PageSection';
import type { RoundedType } from '@components/PageSection';
import ButtonGray from './ButtonGray';
import { PricingInfo } from '../content/pricing/config';
import Text from './Text';
// @ts-ignore
import imgBolt from '@images/bolt.png?w=120&format=webp';
import ButtonYellow from './ButtonYellow';
import PricingCard from './PricingCard';

type Formatting = {
  rounded?: RoundedType;
};

const PricingLanding: React.FC<Formatting> = ({ rounded }) => {
  return (
    <Container>
      <PageSection rounded={rounded}>
        <div className={'relative p-10 pb-64 pt-64 lg:px-42 lg:py-80 '}>
          <div>
            <h2 className="typo-h5 text-center text-gray-dark-12 lg:typo-h4">
              Best Pricing. Period.
            </h2>
            <div className="mt-28 flex items-center justify-center gap-16">
              <img
                src={'/svg/bolt-white.svg'}
                alt="fleek bolt icon"
                className="hidden h-32 w-16 lg:block"
              />
              <div className="typo-caption-s-normal text-center lg:typo-caption-l">
                Switch today and start saving money
              </div>
              <img
                src={'/svg/bolt-white.svg'}
                alt="fleek bolt icon"
                className="hidden h-32 w-16 lg:block"
              />
            </div>
          </div>
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
                  border={item.border}
                  coloredBtn={true}
                  btnBg={item.btnBg}
                  fontColor={item.fontColor}
                  hoverBtnBg={item.hoverBtnBg}
                  url={item.url}
                />
              );
            })}
          </div>
        </div>
      </PageSection>
    </Container>
  );
};

export default PricingLanding;
