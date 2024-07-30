interface Props {
  className?: string;
  border?: string;
  onClick?: () => void;
}

const ButtonGhost: React.FC<React.PropsWithChildren<Props>> = ({
  onClick,
  className,
  ...props
}) => {
  return (
    <button
      className="button-ghost flex w-full items-center space-x-2 rounded-8 bg-transparent py-6 text-gray-dark-11 hover:text-yellow hover:underline disabled:bg-transparent"
      onClick={onClick}
    >
      {props.children}
    </button>
  );
};

export default ButtonGhost;
