import React from 'react';
import { Container } from './Container';
import { Text } from './Text';
import { Button } from '../Button';

// TODO: App or dashboard url should be computed
// from env var. See href fleek.xyz
const ReadyToLive: React.FC = () => {
  return (
    <Container
      gradient="right"
      classNameOuterContainer="py-[72px]"
      classNameInnerContainer="flex flex-col items-center space-y-40 text-center"
    >
      <Text as="h3">Are you on Fleek yet?</Text>
      <Button href="https://fleek.xyz" variant="app-primary" className="w-fit">
        Get started with Fleek
      </Button>
    </Container>
  );
};

export default ReadyToLive;
