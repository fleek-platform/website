import type { PropsWithChildren } from "react";
import Text from "./Text";

type TransparentCardLargeProps = PropsWithChildren & {
  title: string;
};

const TransparentCardLarge = ({ title, children }: TransparentCardLargeProps) => (
  <div className="flex flex-col gap-48 lg:max-w-[340px] w-full py-24 px-16 bg-black-transparent rounded-24 shadow-dark">
    <Text className="text-center">{title}</Text>
    {children}
  </div>
);

export default TransparentCardLarge;
