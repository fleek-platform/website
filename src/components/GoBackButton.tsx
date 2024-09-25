import { FaChevronLeft } from 'react-icons/fa6';
import { Button } from './Button/Button';

export const GoBackButton: React.FC = () => {
  const handleClick = () => {
    if (history.length > 2) {
      history.back();
    } else {
      window.location.href = '/blog';
    }
  };

  return (
    <Button variant="ghost" size="sm" id="goBackButton" onClick={handleClick}>
      <FaChevronLeft className="size-12" /> Go back
    </Button>
  );
};
