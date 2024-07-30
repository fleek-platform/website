import Text from '@components/Text';

interface Props {
  className?: string;
  border?: string;
  onClick?: () => void;
  variant?: 'default' | 'text';
}

const ButtonGray: React.FC<React.PropsWithChildren<Props>> = ({
  onClick,
  className,
  variant = 'default',
  ...props
}) => {
  const buttonClass =
    variant === 'text'
      ? 'flex w-full items-center space-x-2 bg-transparent  py-6 px-6 rounded-8 text-gray-dark-11 hover:bg-gray-dark-5 disabled:bg-transparent '
      : `${props.border} inline-block w-full rounded-12 bg-gray-dark-4 px-32 py-16 hover:bg-gray-dark-5 sm:w-fit`;

  return (
    <button className={buttonClass} onClick={onClick}>
      {props.children}
    </button>
  );
};

export default ButtonGray;
