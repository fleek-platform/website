import React from 'react';
import { Container } from './v2/LandingPage/Container/Container';
import { Button } from './v2/Button/Button';
import { Text } from './v2/LandingPage/Text/Text';

const ReadyToLive: React.FC = () => {
  return (
    <Container
      gradient="right"
      className="flex flex-col items-center space-y-40"
    >
      <Text as="h3">Are you on Fleek yet?</Text>
      <Button
        href="https://app.fleek.xyz"
        variant="app-primary"
        className="w-fit"
      >
        Get started with Fleek
      </Button>
    </Container>
  );
};

export default ReadyToLive;
