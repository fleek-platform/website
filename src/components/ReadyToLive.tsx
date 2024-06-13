import React from 'react';
import Container from './Container';
import PageSection from './PageSection';
import ButtonYellow from './ButtonYellow';
import type { RoundedType } from '@components/PageSection';
import Link from './Link';
import Text from './Text';

interface Props {
  rounded?: RoundedType;
}

const ReadyToLive: React.FC<Props> = ({ rounded }) => {
  return (
    <Container>
      <PageSection rounded={rounded}>
        <div className={'relative pb-64 pt-24 lg:px-42 lg:py-54 '}>
          <h2 className="typo-h5 mx-64 text-center text-gray-dark-12 lg:typo-h4 lg:mx-0">
            Are you on Fleek yet?
          </h2>
          <div className="mx-64 mt-32 flex justify-center lg:mx-0">
            <Link href="https://app.fleek.xyz" className="w-full lg:w-fit">
              <ButtonYellow
                border="border-yellow"
                className="flex items-center justify-center gap-12 "
              >
                <div>
                  <img src="/svg/bolt-yellow.svg" />
                </div>
                <Text as="span" className="btn-l">
                  Get started
                </Text>
              </ButtonYellow>
            </Link>
          </div>
        </div>
      </PageSection>
    </Container>
  );
};

export default ReadyToLive;
