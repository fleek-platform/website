import { FaChevronLeft } from 'react-icons/fa6';
import { Button } from './Button';

export const GoBackButton: React.FC<{ onClick: () => void }> = ({
  onClick,
}) => {
  return (
    <Button variant="ghost" className="text-yellow-dark-11" onClick={onClick}>
      <FaChevronLeft className="size-12" /> Go back
    </Button>
  );
};
