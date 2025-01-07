import type React from 'react';
import { Box } from './Box';
import { Layout } from './Layout';

export const InitialLoadingState: React.FC = () => {
  return (
    <Layout>
      <Box className="h-[525px]">Loading...</Box>
    </Layout>
  );
};
