import Text from '@components/Text';
import type { PropsWithChildren } from 'react';

type ButtonYellowProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  PropsWithChildren & {
    className?: string;
    border?: string;
  };

const ButtonYellow = ({
  children,
  className,
  border,
  ...props
}: ButtonYellowProps) => {
  return (
    <button
      className={`${border} inline-block w-full rounded-12 bg-yellow-dark-4 px-32 py-16 hover:bg-yellow-dark-5 sm:w-fit`}
      {...props}
    >
      <Text
        as="span"
        style="btn-l"
        className={`flex items-center justify-center gap-12 text-yellow-dark-11 ${className}`}
      >
        {children}
      </Text>
    </button>
  );
};

export default ButtonYellow;
