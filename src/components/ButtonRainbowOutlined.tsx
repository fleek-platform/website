import Text from "@components/Text";

const ButtonRainbowOutlined: React.FC<React.PropsWithChildren> = (props) => {
  return (
    <button className="inline-block rounded-12 bg-brand-rainbow p-1">
      <span className="inline-block rounded-11 bg-ui-black px-15 py-7">
        <Text as="span" style="nav-m">
          {props.children}
        </Text>
      </span>
    </button>
  );
};

export default ButtonRainbowOutlined;
