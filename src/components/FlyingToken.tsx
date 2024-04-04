import clsx from "clsx";

type FlyingTokenProps = {
  // TODO: verify as original was import { StaticImageData } from "next/image";
  icon: string;
  alt: string;
  className: string;
};

const FlyingToken = ({ icon, alt, className }: FlyingTokenProps) => (
  <div className={clsx("animate-float absolute h-[100px] w-[100px] md:w-[180px] md:h-[180px] lg:w-[220px] lg:h-[220px]", className)}>
    <img
      className="object-contain mix-blend-screen"
      src={icon}
      alt={alt}
    />
  </div>
);

export default FlyingToken;

