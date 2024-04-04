import ExportedImage from "next-image-export-optimizer";

type IconOnBlackProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

const IconOnBlack = ({ src, alt, width = 40, height = 40 }: IconOnBlackProps) => (
  <div className="flex justify-center items-center rounded-20 p-16 bg-black w-fit shadow-dark w-full max-w-[72px] h-72">
    <ExportedImage src={src} alt={alt} width={width} height={height} />
  </div>
);

export default IconOnBlack;
