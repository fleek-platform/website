import clsx from "clsx";

interface Props {
  className?: string;
}

const GridLayout: React.FC<React.PropsWithChildren<Props>> = (props) => {
  return (
    <div
      className={clsx(
        "grid grid-flow-dense grid-cols-16 gap-x-16 px-8 lg:px-42",
        props.className
      )}
    >
      {props.children}
    </div>
  );
};

export default GridLayout;
