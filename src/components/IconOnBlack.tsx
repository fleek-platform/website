type IconOnBlackProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

const IconOnBlack = ({
  src,
  alt,
  width = 40,
  height = 40,
}: IconOnBlackProps) => (
  <div className="flex h-72 w-fit w-full max-w-[72px] items-center justify-center rounded-20 bg-black p-16 shadow-dark">
    <img src={src} alt={alt} width={width} height={height} />
  </div>
);

export default IconOnBlack;
