import Text from "@components/Text";

const ActionButton: React.FC<React.PropsWithChildren> = () => {
  return (
    <a href="https://app.fleek.xyz" target="_blank" rel="noopener noreferrer">
      <button className="inline-block rounded-10 bg-brand-rainbow p-1 max-w-[230px] w-full">
      <span className="flex items-center justify-center rounded-10 bg-ui-black px-20 py-8">
        <Text as="span" style="btn-action" className="mr-10">
          Get started
        </Text>
        <img
          src="/images/fleek-bolt.png"
          alt="Fleek Bolt"
          width={13}
          height={26}
        />
      </span>
    </button>
    </a>
  );
};

export default ActionButton;
