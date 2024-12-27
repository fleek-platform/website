import { FaChevronLeft } from 'react-icons/fa6';
import { Button } from './Button';
import { useElizaForm } from '../hooks/useElizaForm';
import { INITIAL_FORM } from '../constants';

export const GoBackButton: React.FC<{ onClick: () => void }> = ({
  onClick,
}) => {
  const { reset } = useElizaForm();

  const handleClick = () => {
    reset(INITIAL_FORM);
    onClick();
  };

  return (
    <Button
      variant="ghost"
      className="text-yellow-dark-11"
      onClick={handleClick}
    >
      <FaChevronLeft className="size-12" /> Go back
    </Button>
  );
};
