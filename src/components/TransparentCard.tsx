import Text from "@components/Text";
import clsx from "clsx";
import IconOnBlack from "./IconOnBlack";
import type { PropsWithChildren } from "react";

type Feature = PropsWithChildren & {
  icon: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  },
  title?: string;
  description: string;
  className?: string;
}
const TransparentCard = ({ icon, title, description, children, className }: Feature) => (
  <div className={clsx("flex items-center lg:items-start lg:flex-col p-16 gap-16 rounded-24 bg-black-transparent self-stretch w-full shadow-dark", className)}>
    <IconOnBlack {...icon} />
    <div className="flex flex-col gap-10 full-width text-start">
      {children ? children : (
        <>
          {title && <Text style="caption-m" className="text-white">{title}</Text>}
          <Text style="caption-s" className="col-span-3 whitespace-pre-line normal-case">{description}</Text>
        </>
      )}
    </div>
  </div>
);

export default TransparentCard;
