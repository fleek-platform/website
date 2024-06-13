import Text from '@components/Text';

type ButtonWhiteProps = React.PropsWithChildren & {
  className?: string;
  color?: string;
};

const ButtonYellowOutline: React.FC<ButtonWhiteProps> = (props) => {
  return (
    <button
      className={`inline-block rounded-12 p-1 px-15 py-7 ${props.color == 'yellow' ? 'bg-yellow-dark-4 text-yellow-dark-11 hover:bg-yellow-dark-5' : 'bg-gray-dark-4 text-gray-dark-12 hover:bg-gray-dark-5'} `}
    >
      <p className="font-plex-sans text-12 capitalize leading-[150%] tracking-[0.0rem] lg:text-16">
        {props.children}
      </p>
    </button>
  );
};

export default ButtonYellowOutline;
