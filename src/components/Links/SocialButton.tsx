import { Button } from '@components/Button';

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
    <Button variant="secondary" className="text-neu flex-1" size="sm">
      <a
        aria-label={ariaLabel}
        href={href}
        rel="noopener noreferrer"
        target="_blank"
        className="flex w-full items-center justify-center"
      >
        {children}
      </a>
    </Button>
  );
};
