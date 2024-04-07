import Text from "@components/Text";
import clsx from "clsx";

import type { PropsWithChildren } from "react";

// TODO: Check type as original is next/image
type StaticImageData = string;

type TableSubheaderProps = PropsWithChildren & { icon: StaticImageData, title: string; className?: string };

const TableSubheader = ({ icon, title, className }: TableSubheaderProps) => (
  <div className={clsx("flex items-center justify-between w-full h-52 bg-black border-y-1 border-x-2 border-ui-dark-grey p-12", className)}>
    <div className="flex items-center w-full">
      <img
        src={icon}
        alt={"Storage"}
        className="w-24 h-24 mr-16"
      />
      <Text style="caption-m" className="text-ui-white">
        {title}
      </Text>
    </div>
  </div>
);

export default TableSubheader;
