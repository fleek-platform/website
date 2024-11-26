import clsx from 'clsx';
import { FaArrowUp } from 'react-icons/fa6';
import { Button } from '@components/Button';
import { Target } from '@components/Link';

type LinkButtonProps = {
  href: string;
  ariaLabel: string;
  label: string;
  className?: string;
};

export const LinkButton: React.FC<LinkButtonProps> = ({
  href,
  ariaLabel,
  label,
  className,
}) => {
  return (
    <Button
      variant="secondary"
      className={clsx(
        'flex w-full flex-row items-center justify-between py-7 font-normal',
        className,
      )}
      size="sm"
      aria-label={ariaLabel}
      href={href}
      rel="noopener noreferrer"
      target={Target.Blank}
    >
      <p className="text-white">{label}</p>
      <FaArrowUp className="rotate-45" />
    </Button>
  );
};
