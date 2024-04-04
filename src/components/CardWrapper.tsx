import GlowWrapper from "@components/GlowWrapper";
import clsx from "clsx";

interface Props {
  className?: string;
  noInnerPadding?: boolean;
}

const CardWrapper: React.FC<React.PropsWithChildren<Props>> = (props) => {
  return (
    <GlowWrapper className={props.className}>
      <div className="h-full rounded-12 bg-gradient-to-b from-[rgba(75,75,75,0.8)] to-[rgba(75,75,75,0.2)] p-1">
        <div
          className={clsx("rounded-11 bg-ui-black h-full", {
            "p-8 lg:px-16 lg:py-20": !props.noInnerPadding,
            "p-0": props.noInnerPadding,
          })}
        >
          {props.children}
        </div>
      </div>
    </GlowWrapper>
  );
};

export default CardWrapper;
