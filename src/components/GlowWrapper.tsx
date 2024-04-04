import clsx from "clsx";

interface Props {
  className?: string;
  hidden?: boolean;
}

const GlowWrapper: React.FC<React.PropsWithChildren<Props>> = ({ className, hidden, children }) => {
  return (
    <div className={clsx("group relative h-full", className)}>
      {children}
      <div className={clsx("absolute left-0 top-0 -z-1 hidden h-full w-full scale-50 bg-brand-rainbow opacity-0 blur-[22px] transition-all duration-500 ease-in group-hover:scale-100 group-hover:opacity-100 group-hover:ease-out lg:block", { hidden })}></div>
    </div>
  );
};

export default GlowWrapper;
