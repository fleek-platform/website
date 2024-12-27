import type React from 'react';
import { Button } from './Button';
import { FaPlus, FaTrash } from 'react-icons/fa6';
import { Box } from './Box';
import type { PropsWithChildren } from 'react';

const Root: React.FC<PropsWithChildren> = ({ children }) => (
  <Box className="gap-8">{children}</Box>
);

const AddField: React.FC<{ append: () => void }> = ({ append }) => (
  <Button variant="ghost" size="sm" className="mr-auto" onClick={append}>
    <FaPlus className="size-14" /> Add more
  </Button>
);

const RemoveField: React.FC<{ isVisible: boolean; remove: () => void }> = ({
  isVisible,
  remove,
}) => {
  if (!isVisible) return null;

  return (
    <Box className="shrink-0">
      <Button className="h-full" variant="ghost" size="sm" onClick={remove}>
        <FaTrash className="size-12" />
      </Button>
    </Box>
  );
};

export const ArrayForm = {
  Root,
  AddField,
  RemoveField,
};
