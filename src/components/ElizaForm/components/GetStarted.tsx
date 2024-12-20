import { Layout } from './Layout';
import { Text } from './Text';
import type React from 'react';

export const GetStarted: React.FC = () => {
  return (
    <Layout>
      <div className="flex flex-col items-start gap-16">
        <Text variant="secondary">Deploy an AI agent</Text>
        <Text>Get started</Text>
        <Text variant="description" className="text-wrap">
          To start developing your AI agent, please select one of the options
          provided below.
        </Text>
      </div>
    </Layout>
  );
};
