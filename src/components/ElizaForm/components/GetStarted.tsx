import { FaCloud } from 'react-icons/fa6';
import { ActionBox } from './ActionBox';
import { Layout } from './Layout';
import { Text } from './Text';
import type React from 'react';
import { Box } from './Box';

export const GetStarted: React.FC = () => {
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
          icon={<FaCloud className="size-24 shrink-0" />}
          title="Upload characterfile"
          description="Already have a characterfile? Create an agent with an upload."
          onClick={() => {}}
        />
        <ActionBox
          icon={<FaCloud className="size-24 shrink-0" />}
          title="Build from scratch"
          description="Create an agent by entering details into a form."
          onClick={() => {}}
        />
        <ActionBox
          icon={<FaCloud className="size-24 shrink-0" />}
          title="Start with template"
          description="Create an agent by customizing an existing template."
          onClick={() => {}}
        />
      </Box>
    </Layout>
  );
};
