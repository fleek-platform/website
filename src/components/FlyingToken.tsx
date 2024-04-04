import clsx from "clsx";
import ExportedImage from "next-image-export-optimizer";
import { StaticImageData } from "next/image";

type FlyingTokenProps = {
  icon: StaticImageData;
  alt: string;
  className: string;
};

const FlyingToken = ({ icon, alt, className }: FlyingTokenProps) => (
  <div className={clsx("animate-float absolute h-[100px] w-[100px] md:w-[180px] md:h-[180px] lg:w-[220px] lg:h-[220px]", className)}>
    <ExportedImage
      className="object-contain mix-blend-screen"
      src={icon}
      alt={alt}
    />
  </div>
);

export default FlyingToken;

