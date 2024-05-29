import Text from '@components/Text';

interface Props {
  className?: string;
  border?: string;
}

const ButtonGray: React.FC<React.PropsWithChildren<Props>> = (props) => {
  return (
    <button
      className={`${props.border} inline-block rounded-12 border border-gray-dark-7 px-32 py-16 ${props.border == 'border-yellow' ? 'hover:border-yellow-dark-12' : 'hover:border-gray-dark-8'}  `}
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

export default ButtonGray;
