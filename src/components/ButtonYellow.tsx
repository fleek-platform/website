import Text from '@components/Text';

interface Props {
  className?: string;
  border?: string;
}

const ButtonYellow: React.FC<React.PropsWithChildren<Props>> = (props) => {
  return (
    <button
      className={`${props.border} inline-block w-full rounded-12 bg-yellow-dark-4 px-32 py-16 hover:bg-yellow-dark-5 sm:w-fit`}
    >
      <Text
        as="span"
        style="btn-l"
        className={`flex items-center justify-center gap-12 text-yellow-dark-11 ${props.className}`}
      >
        {props.children}
      </Text>
    </button>
  );
};

export default ButtonYellow;
