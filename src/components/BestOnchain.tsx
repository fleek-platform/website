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
      <PageSection rounded={rounded} className="overflow-hidden rounded-48">
        <div className={'relative p-10 pb-64 pt-64 lg:px-42 lg:py-80 '}>
          <div>
            <h2 className="typo-h5 text-center text-gray-dark-12 lg:typo-h4 ">
              Plus the Best of Onchain
            </h2>
            <div className="mt-28 flex items-center justify-center gap-16">
              <img
                src={'/svg/bolt-white.svg'}
                alt="fleek bolt icon"
                className="hidden h-32 w-16 lg:block"
              />
              <div className="typo-caption-s-normal mx-30 text-center text-gray-dark-11 lg:typo-caption-l lg:mx-0">
                Storage, Compute, Domains, CDN & More
              </div>
              <img
                src={'/svg/bolt-white.svg'}
                alt="fleek bolt icon"
                className="hidden h-32 w-16 lg:block"
              />
            </div>
          </div>
        </div>
        <div className="relative rounded-48 rounded-b-12">
          <img
            src="/svg/onchain.svg"
            alt="onchain"
            className="hidden rounded-b-48 lg:block"
          />
          <img
            src="/svg/onchain-mobile.svg"
            alt="onchain"
            className="left-0 top-0 my-80 mt-120 scale-150 rounded-b-48 lg:hidden"
          />
        </div>
      </PageSection>
    </Container>
  );
};

export default BestOnchain;
