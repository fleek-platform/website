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
      className={`flex w-full items-center space-x-2 rounded-8 bg-transparent px-6 py-6 pr-12 text-gray-dark-11 hover:bg-ui-mid-grey hover:text-white disabled:bg-transparent ${className}`}
      onClick={onClick}
    >
      {props.children}
    </button>
  );
};

export default ButtonGhost;
