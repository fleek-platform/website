import Text from '@components/Text';

interface Props {
  className?: string;
  border?: string;
  bg?: string;
  fontColor?: string;
  hoverBtnBg?: string;
}

const PricingButton: React.FC<React.PropsWithChildren<Props>> = (props) => {
  return (
    <button
      className={`${props.border} ${props.bg} inline-block w-full rounded-12 px-24 py-14 duration-300 ease-in-out ${props.hoverBtnBg} hover:border-yellow-dark-12`}
    >
      <Text
        as="span"
        style="btn-l"
        className={`${props.bg == 'bg-yellow-dark-4' ? 'text-yellow-dark-11' : 'text-gray-dark-11'}  ${props.className} ${props.fontColor}`}
      >
        {props.children}
      </Text>
    </button>
  );
};

export default PricingButton;
