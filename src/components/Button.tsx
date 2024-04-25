import Text from '@components/Text';
import GlowWrapper from '@components/GlowWrapper';

interface Props {
  className?: string;
}

const Button: React.FC<React.PropsWithChildren<Props>> = (props) => {
  return (
    <GlowWrapper className={props.className}>
      <button className="inline-block rounded-12 bg-button-gradient px-32 py-16">
        <Text as="span" style="btn-l" className="text-ui-white">
          {props.children}
        </Text>
      </button>
    </GlowWrapper>
  );
};

export default Button;
