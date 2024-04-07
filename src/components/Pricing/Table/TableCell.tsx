import Text from "@components/Text";
import clsx from "clsx";

import type { PropsWithChildren } from "react"

type TableCellProps = PropsWithChildren<{ 
  className?: string;
}>; 

const TableCell = ({ children, className }: TableCellProps) => (
  <div className={clsx(className, "flex items-center min-h-52 p-12 bg-ui-black border-1 border-ui-dark-grey")}>
    <Text style="m">{children}</Text>
  </div>
);

export default TableCell;
