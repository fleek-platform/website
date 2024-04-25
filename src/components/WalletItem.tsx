import Text from './Text';

type WalletItemProps = {
  // TODO: Verify as original was import { StaticImageData } from "next/image";
  icon: string;
  label: string;
};

const WalletItem = ({ icon, label }: WalletItemProps) => (
  <div className="col-span-8 flex h-full flex-col items-center justify-center gap-8">
    <div className="flex items-center justify-center rounded-19 bg-ui-black p-12">
      <img
        src={icon}
        alt={label}
        width={38.5}
        height={38.5}
        // TODO: The original has support for blur, solve
        // placeholder="blur"
      />
    </div>
    <Text as="label" style="caption-s">
      {label}
    </Text>
  </div>
);

export default WalletItem;
