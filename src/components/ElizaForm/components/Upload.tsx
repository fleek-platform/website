import Text from '@components/Text';
import type React from 'react';
import type { GoToProps } from '../types';
import { Button } from './Button';
import { Box } from './Box';
import { FaChevronLeft } from 'react-icons/fa6';

export const Upload: React.FC<GoToProps> = ({ goTo }) => {
  return (
    <Box>
      <Button
        variant="ghost"
        className="text-yellow-dark-11"
        onClick={() => goTo('getStarted')}
      >
        <FaChevronLeft /> Go back
      </Button>
      <Text>Hello</Text>
    </Box>
  );
};
