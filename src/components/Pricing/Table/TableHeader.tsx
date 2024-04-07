import Text from "@components/Text";
import clsx from "clsx";
import { PlanHeader } from "./types";

const TableHeader = ({ title, titleClassName, subtitle, description, cta }: PlanHeader) => (
  <div className="bg-ui-black flex flex-col items-center justify-between rounded-t-28 py-20 px-10 gap-16 border-1 border-b-0 border-ui-dark-grey w-full lg:max-w-[342px] h-full">
    <Text style="h5" className={titleClassName}>
      {title}
    </Text>
    <Text style="xl" className="text-white">
      {subtitle}
    </Text>
    <Text style="s" className="whitespace-pre-wrap text-ui-light-grey text-center">
      {description}
    </Text>
    <a href={cta.href} className={clsx("p-1 bg-ui-white bg-opacity-4 rounded-13", cta.className)} target="_blank" rel="noopener noreferrer">
      <button className="flex items-center justify-center py-16 px-32 rounded-12 bg-ui-black">
        <Text style="btn-s">{cta.text}</Text>
      </button>
    </a>
  </div>
);

export default TableHeader;
