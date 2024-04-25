import clsx from 'clsx';

type FlyingTokenProps = {
  // TODO: verify as original was import { StaticImageData } from "next/image";
  icon: string;
  alt: string;
  className: string;
};

const FlyingToken = ({ icon, alt, className }: FlyingTokenProps) => (
  <div
    className={clsx(
      'absolute h-[100px] w-[100px] animate-float md:h-[180px] md:w-[180px] lg:h-[220px] lg:w-[220px]',
      className,
    )}
  >
    <img className="object-contain mix-blend-screen" src={icon} alt={alt} />
  </div>
);

export default FlyingToken;
