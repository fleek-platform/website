import Text from '@components/Text';
import clsx from 'clsx';

type ButtonWhiteProps = React.PropsWithChildren & {
  className?: string;
  onClick: () => void;
};

const ButtonWhite: React.FC<ButtonWhiteProps> = (props) => {
  return (
    <button
      onClick={props.onClick}
      className={clsx(
        'inline-block rounded-10 bg-gradient-radial-white px-15 py-[0.62rem]',
        props.className,
      )}
    >
      <Text as="span" style="btn-xs" className="text-ui-black">
        {props.children}
      </Text>
    </button>
  );
};

export default ButtonWhite;
