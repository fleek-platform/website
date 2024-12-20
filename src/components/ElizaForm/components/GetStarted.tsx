import { FaCloud } from 'react-icons/fa6';
import { ActionBox } from './ActionBox';
import { Layout } from './Layout';
import { Text } from './Text';
import type React from 'react';
import { Box } from './Box';
import type { GoToProps } from '../types';

export const GetStarted: React.FC<GoToProps> = ({ goTo }) => {
  return (
    <Layout>
      <Box className="items-start gap-16">
        <Text variant="secondary">Deploy an AI agent</Text>
        <Text>Get started</Text>
        <Text variant="description" className="text-wrap">
          To start developing your AI agent, please select one of the options
          provided below.
        </Text>
      </Box>
      <Box className="gap-22">
        <ActionBox
          href="/eliza"
          icon={<FaCloud className="size-24 shrink-0" />}
          title="Upload characterfile"
          description="Already have a characterfile? Create an agent with an upload."
        />
        <ActionBox
          onClick={() => goTo('characterfile')}
          icon={<FaCloud className="size-24 shrink-0" />}
          title="Build from scratch"
          description="Create an agent by entering details into a form."
        />
        <ActionBox
          onClick={() =>
            goTo('characterfile', { forwardProps: { template: 'eliza' } })
          }
          icon={<FaCloud className="size-24 shrink-0" />}
          title="Start with template"
          description="Create an agent by customizing an existing template."
        />
      </Box>
    </Layout>
  );
};
