import Text from '@components/Text';

interface Props {
  className?: string;
  border?: string;
}

const ButtonYellow: React.FC<React.PropsWithChildren<Props>> = (props) => {
  return (
    <button
      className={`${props.border} inline-block rounded-12 border border-yellow-dark-9 px-32 py-16 hover:border-yellow-dark-12`}
    >
      <Text
        as="span"
        style="btn-l"
        className={`text-gray-dark-12 ${props.className}`}
      >
        {props.children}
      </Text>
    </button>
  );
};

export default ButtonYellow;
