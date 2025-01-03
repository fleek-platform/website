import type React from 'react';
import type { GoToProps } from '../types';
import { Box } from './Box';
import { useElizaForm } from '../hooks/useElizaForm';
import { transformSchemaToCharacter } from '../utils/transformData';
import { Button } from './Button';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

export const ReviewPage: React.FC<GoToProps> = ({ goTo }) => {
  const { getValues } = useElizaForm();
  const data = getValues();
  const transformedData = transformSchemaToCharacter(data);

  return (
    <Box className="gap-38">
      <Box className="w-full flex-row items-center justify-between">
        <Button
          variant="ghost"
          className="text-yellow-dark-11"
          onClick={() => goTo('settings')}
        >
          <FaChevronLeft />
          Settings
        </Button>
        <Button variant="ghost" className="text-yellow-dark-11" disabled>
          Deploy <FaChevronRight />
        </Button>
      </Box>
      <pre className="max-h-608 overflow-x-auto rounded-12 border border-elz-neutral-6 bg-elz-neutral-1 p-12 text-[1.2rem]">
        {JSON.stringify(transformedData, null, 2)}
      </pre>
    </Box>
  );
};
