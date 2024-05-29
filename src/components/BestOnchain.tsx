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

const BestOnchain: React.FC<Formatting> = ({ rounded }) => {
  return (
    <Container>
      <PageSection rounded={rounded}>
        <div className={'relative p-10 pb-64 pt-64 lg:px-42 lg:py-80 '}>
          <div>
            <h2 className="typo-h5 text-center text-gray-dark-12 lg:typo-h4">
              Plus the Best of Onchain
            </h2>
            <div className="mt-28 flex items-center justify-center gap-16">
              <img
                src={'/svg/bolt-white.svg'}
                alt="fleek bolt icon"
                className="h-32 w-16"
              />
              <div className="typo-caption-xs lg:typo-caption-l">
                Storage, Compute, Domains, CDN & More
              </div>
              <img
                src={'/svg/bolt-white.svg'}
                alt="fleek bolt icon"
                className="h-32 w-16"
              />
            </div>
          </div>
        </div>
        <div className="rounded-b-12">
          <img src="/svg/onchain.svg" alt="onchain" className="rounded-b-48" />
        </div>
      </PageSection>
    </Container>
  );
};

export default BestOnchain;
