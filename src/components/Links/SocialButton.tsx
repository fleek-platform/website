import { Button } from '@components/Button';
import { Target } from '@components/Link';

type SocialButtonProps = {
  href: string;
  ariaLabel: string;
  children: React.ReactNode;
};

export const SocialButton: React.FC<SocialButtonProps> = ({
  href,
  children,
  ariaLabel,
}) => {
  return (
    <Button
      variant="secondary"
      className="text-neu flex w-full flex-1 items-center justify-center"
      aria-label={ariaLabel}
      href={href}
      rel="noopener noreferrer"
      target={Target.Blank}
    >
      {children}
    </Button>
  );
};
