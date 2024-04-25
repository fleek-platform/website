import Text from '@components/Text';
import imgFleekBolt from '@images/fleek-bolt.png';

const ActionButton: React.FC<React.PropsWithChildren> = () => {
  return (
    <a href="https://app.fleek.xyz" target="_blank" rel="noopener noreferrer">
      <button className="inline-block w-full max-w-[230px] rounded-10 bg-brand-rainbow p-1">
        <span className="flex items-center justify-center rounded-10 bg-ui-black px-20 py-8">
          <Text as="span" style="btn-action" className="mr-10">
            Get started
          </Text>
          <img src={imgFleekBolt.src} alt="Fleek Bolt" width={13} height={26} />
        </span>
      </button>
    </a>
  );
};

export default ActionButton;
