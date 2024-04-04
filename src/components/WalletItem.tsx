import ExportedImage from "next-image-export-optimizer";
import { StaticImageData } from "next/image";
import Text from "./Text";

type WalletItemProps = {
  icon: StaticImageData;
  label: string;
};

const WalletItem = ({ icon, label }: WalletItemProps) => (
  <div className="col-span-8 flex flex-col items-center justify-center gap-8 h-full">
  <div className="flex items-center justify-center p-12 rounded-19 bg-ui-black">
    <ExportedImage
      src={icon}
      alt={label}
      width={38.5}
      height={38.5}
      placeholder="blur"
   />
  </div>
  <Text as="label" style="caption-s">{label}</Text>
</div>
);

export default WalletItem;

