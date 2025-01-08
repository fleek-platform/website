import type React from 'react';
import { Box } from './Box';
import { Layout } from './Layout';
import { Text } from './Text';
import { FaArrowRight } from 'react-icons/fa6';

export const InitialLoadingState: React.FC = () => {
  return (
    <Layout>
      <Box className="gap-38">
        <Box className="items-start gap-16">
          <Text variant="secondary" className="flex h-32 items-center">
            Deploy an AI agent
          </Text>
          <Text>Get started</Text>
          <Text variant="description" className="text-wrap">
            To start developing your AI agent, please select one of the options
            provided below.
          </Text>
        </Box>
        <Box className="gap-22">
          {Array.from({ length: 3 }).map((_, idx) => (
            <Box
              key={idx}
              variant="container"
              className="w-full animate-pulse select-none"
            >
              <Box className="flex-row items-center gap-16">
                <Box className="size-34 rounded-8 bg-elz-neutral-4" />
                <Box className="flex-1 gap-15">
                  <Box className="h-24 w-[40%] rounded-8 bg-elz-neutral-4" />
                  <Box className="h-16 w-[79%] rounded-8 bg-elz-neutral-4" />
                </Box>
                <FaArrowRight className="ml-auto size-24 text-elz-neutral-6" />
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Layout>
  );
};
