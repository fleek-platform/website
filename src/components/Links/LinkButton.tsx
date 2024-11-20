import { Button } from '@components/Button';
import { FaArrowUp } from 'react-icons/fa6';

type LinkButtonProps = {
  href: string;
  ariaLabel: string;
  label: string;
};

export const LinkButton: React.FC<LinkButtonProps> = ({
  href,
  ariaLabel,
  label,
}) => {
  return (
    <Button variant="secondary" className="w-full py-7 font-normal" size="sm">
      <a
        aria-label={ariaLabel}
        href={href}
        rel="noopener noreferrer"
        target="_blank"
        className="flex w-full flex-row items-center justify-between"
      >
        <p className="text-white">{label}</p>
        <FaArrowUp className="rotate-45" />
      </a>
    </Button>
  );
};
