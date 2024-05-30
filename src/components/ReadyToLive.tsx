import React from 'react';
import Container from './Container';
import PageSection from './PageSection';
import ButtonYellow from './ButtonYellow';
import type { RoundedType } from '@components/PageSection';

interface Props {
  rounded?: RoundedType;
}

const ReadyToLive: React.FC<Props> = ({ rounded }) => {
  return (
    <Container>
      <PageSection rounded={rounded}>
        <div className={'relative pb-64 pt-24 lg:px-42 lg:py-54 '}>
          <h2 className="typo-h5 text-center text-gray-dark-12 lg:typo-h4">
            Are you on Fleek yet?
          </h2>
          <div className="mt-32 flex justify-center">
            <ButtonYellow
              border="border-yellow"
              className="flex items-center justify-center gap-12 "
            >
              <div>
                <img src="/svg/bolt-yellow.svg" />
              </div>
              <div>Get started</div>
            </ButtonYellow>
          </div>
        </div>
      </PageSection>
    </Container>
  );
};

export default ReadyToLive;
