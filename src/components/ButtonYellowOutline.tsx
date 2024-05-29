import Text from '@components/Text';

type ButtonWhiteProps = React.PropsWithChildren & {
  className?: string;
  color?: string;
};

const ButtonYellowOutline: React.FC<ButtonWhiteProps> = (props) => {
  return (
    <button
      className={`inline-block rounded-12 border p-1 px-15 py-7 text-gray-dark-12 ${props.color == 'yellow' ? 'border-yellow-dark-9 hover:border-yellow-dark-12' : 'border-gray-dark-7 hover:border-gray-dark-8'} `}
    >
      <p className="font-plex-sans text-8 uppercase leading-[150%] tracking-[0.064rem] lg:text-16">
        {props.children}
      </p>
    </button>
  );
};

export default ButtonYellowOutline;
