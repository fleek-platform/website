import Text from "@components/Text";
import clsx from "clsx";

type ButtonOutlinedProps = React.PropsWithChildren & {
  className?: string;
};

const ButtonOutlined: React.FC<ButtonOutlinedProps> = (props) => {
  return (
    <button className={clsx("inline-block rounded-10 bg-white p-1", props.className)}>
      <span className="inline-block rounded-10 bg-ui-black px-19 py-9">
        <Text as="span" style="btn-s">
          {props.children}
        </Text>
      </span>
    </button>
  );
};

export default ButtonOutlined;
